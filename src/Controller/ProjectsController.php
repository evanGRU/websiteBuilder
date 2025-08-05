<?php

namespace App\Controller;

use App\Entity\Component;
use App\Entity\Div;
use App\Entity\Project;
use App\Entity\Text;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

final class ProjectsController extends AbstractController
{
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

        $newProject = new Project();
        $newProject->setName($project['name']);
        $newProject->setCreatedBy($this->getUser());
        $newProject->setState('pending');

        $entityManager->persist($newProject);
        $entityManager->flush();

        return $this->json(['message' => 'Project has been created.'], 201);
    }

    #[Route('/api/projects/{id}/websiteData', name: 'api_project_website_data', methods: ['GET'])]
    public function getWebsiteData(int $id, EntityManagerInterface $em): Response
    {
        $components = $em->getRepository(Component::class)->findByProjectWithContent($id);
        $result = [];

        foreach ($components as $component) {
            $content = $component->getContent();
            $contentData = null;

            if ($content instanceof Text) {
                $contentData = [
                    'type' => 'text',
                    'tag' => $content->getTag(),
                    'value' => $content->getValue(),
//                    'style' => $component->getStyle(),
                ];
            } elseif ($content instanceof Div) {
                $contentData = [
                    'type' => 'div',
                    'class' => $content->getClass(),
                ];
            }

            $result[] = [
                'id' => $component->getId(),
                'type' => $component->getType(),
                'content' => $contentData,
            ];
        }

        return $this->json($result);
    }
}
