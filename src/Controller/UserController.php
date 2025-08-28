<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

final class UserController extends AbstractController
{
    private EmailVerifier $emailVerifier;
    private EntityManagerInterface $em;

    public function __construct(EmailVerifier $emailVerifier, EntityManagerInterface $em)
    {
        $this->emailVerifier = $emailVerifier;
        $this->em = $em;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
    ): Response
    {
        $user = json_decode($request->getContent(), true);

        if (!$user) {
            return $this->json(['code' => 'invalidFileType'], 400);
        }

        if (empty($user['firstname']) || empty($user['name']) || empty($user['email']) || empty($user['password'])) {
            return $this->json(['code' => 'dataMissing'], 400);
        }

        $existingUser = $this->em->getRepository(User::class)->findOneBy(['email' => $user['email']]);
        if ($existingUser) {
            return $this->json(['code' => 'emailExist'], 400);
        }

        $newUser = new User();
        $newUser->setFirstname($user['firstname']);
        $newUser->setName($user['name']);
        $newUser->setEmail($user['email']);
        $newUser->setRoles(['ROLE_USER']);
        $newUser->setPassword(
            $passwordHasher->hashPassword($newUser, $user['password'])
        );
        $newUser->setIsVerified(false);

        $this->em->persist($newUser);
        $this->em->flush();

        $this->emailVerifier->sendEmailConfirmation('app_verify_email', $newUser);

        return $this->json(['code' => 'registerSuccess'], 201);
    }

    #[Route('/api/verify', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, UserRepository $userRepository): JsonResponse
    {
        $id = $request->get('id');
        $user = $userRepository->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'userNotFound'], 404);
        }

        try {
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $e) {
            return new JsonResponse(['error' => $e->getReason()], 400);
        }

        $user->setIsVerified(true);
        $this->em->flush();

        return new JsonResponse(['code' => 'verifiedSuccess'], 201);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(UserInterface $user = null): JsonResponse
    {
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }

        return $this->json([
            'email' => $user->getUserIdentifier(),
            'fullname' => $user->getFullname(),
        ]);
    }
}
