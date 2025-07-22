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
        $user = json_decode($request->getContent(), true);

        if (!$user) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        if (empty($user['firstname']) || empty($user['name']) || empty($user['email']) || empty($user['password'])) {
            return $this->json(['error' => 'Firstname, name, email and password are required'], 400);
        }

        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $user['email']]);
        if ($existingUser) {
            return $this->json(['error' => 'Email already exists'], 400);
        }

        $newUser = new User();
        $newUser->setFirstname($user['firstname']);
        $newUser->setName($user['name']);
        $newUser->setEmail($user['email']);
        $newUser->setRoles(['ROLE_USER']);
        $newUser->setPassword(
            $passwordHasher->hashPassword($newUser, $user['password'])
        );

        $entityManager->persist($newUser);
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
            'fullname' => $user->getFullname(),
        ]);
    }
}
