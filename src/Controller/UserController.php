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
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response
    {
        $content = json_decode($request->getContent(), true);

        if (!$content) {
            return new Response(json_encode(['error' => 'Invalid JSON']), 400, ['Content-Type' => 'application/json']);
        }

        $email = $content['email'] ?? null;
        $password = $content['password'] ?? null;

        if (empty($email) || empty($password)) {
            return new Response(json_encode(['error' => 'Email and password are required']), 400, ['Content-Type' => 'application/json']);
        }

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return new Response(json_encode(['error' => 'Invalid credentials']), 401, ['Content-Type' => 'application/json']);
        }

        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new Response(json_encode(['error' => 'Invalid credentials']), 401, ['Content-Type' => 'application/json']);
        }

        return new Response(json_encode([
            'message' => 'Login successful',
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response
    {
        $content = json_decode($request->getContent(), true);

        if (!$content) {
            return new Response(json_encode(['error' => 'Invalid JSON']), 400, ['Content-Type' => 'application/json']);
        }

        if (empty($content['email']) || empty($content['password'])) {
            return new Response(json_encode(['error' => 'Email and password are required']), 400, ['Content-Type' => 'application/json']);
        }

        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $content['email']]);
        if ($existingUser) {
            return new Response(json_encode(['error' => 'Email already exists']), 400, ['Content-Type' => 'application/json']);
        }

        $user = new User();
        $user->setEmail($content['email']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $content['password'])
        );
        $user->setRoles(['ROLE_USER']);

        $entityManager->persist($user);
        $entityManager->flush();

        return new Response(json_encode(['message' => 'User created successfully']), 201, ['Content-Type' => 'application/json']);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(UserInterface $user = null): JsonResponse
    {
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }

        return $this->json([
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }
}
