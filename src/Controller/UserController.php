<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

final class UserController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response
    {
        $content = json_decode($request->getContent(), true);

        if (!$content) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        if (empty($content['firstname']) || empty($content['name']) || empty($content['email']) || empty($content['password'])) {
            return $this->json(['error' => 'Firstname, name, email and password are required'], 400);
        }

        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $content['email']]);
        if ($existingUser) {
            return $this->json(['error' => 'Email already exists'], 400);
        }

        $user = new User();
        $user->setFirstname($content['firstname']);
        $user->setName($content['name']);
        $user->setEmail($content['email']);
        $user->setRoles(['ROLE_USER']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $content['password'])
        );

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(['message' => 'User registered successfully'], 201);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(UserInterface $user = null): JsonResponse
    {
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }

        return $this->json([
            'email' => $user->getUserIdentifier(),
            'firstname' => $user->getFirstname(),
            'name' => $user->getName(),
            'roles' => $user->getRoles(),
        ]);
    }
}
