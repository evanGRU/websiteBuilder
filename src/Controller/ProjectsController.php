<?php

namespace App\Controller;

use App\Entity\Projects;
use App\Repository\ProjectsRepository;
use phpDocumentor\Reflection\Project;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

final class ProjectsController extends AbstractController
{
    #[Route('/api/projects', name: 'api_projects_list', methods: ['GET'])]
    public function listProjects(EntityManagerInterface $entityManager): Response
    {
        $projects = $entityManager->getRepository(Projects::class)->findAll();

        return $this->json($projects);
    }

    #[Route('/api/projects/new', name: 'api_projects_new', methods: ['POST'])]
    public function newProject(
        Request $request,
        EntityManagerInterface $entityManager
    ): Response
    {
        $project = json_decode($request->getContent(), true);

        if (!$project) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        if (empty($project['name'])) {
            return $this->json(['error' => 'Name is required'], 400);
        }

        $newProject = new Projects();
        $newProject->setName($project['name']);
        $newProject->setCreatedBy($this->getUser());
        $newProject->setState('pending');

        $entityManager->persist($newProject);
        $entityManager->flush();

        return $this->json(['message' => 'Project has been created.'], 201);
    }
}
