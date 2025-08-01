<?php

namespace App\Controller;

use App\Entity\Component;
use App\Entity\Project;
use App\Entity\Text;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ComponentsController extends AbstractController
{
    #[Route('/api/components/new', name: 'api_components_new', methods: ['POST'])]
    public function newComponents(
        Request $request,
        EntityManagerInterface $em
    ): Response
    {
        $data = json_decode($request->getContent(), true);
        $project = $em->getRepository(Project::class)->findOneBy(['id' => $data['projectId']]);

        $newComponent = new Component();
        $newComponent->setType($data['type']);
        $newComponent->setProject($project);

        $newContent = [];
        switch ($data['type']) {
            case "text":
                $newContent = new Text();
                $newContent->setTag($data['component']['tag']);
                $newContent->setText($data['component']['text']);
                break;
            default:
                break;
        }
        $newContent->setComponent($newComponent);

        $newComponent->setContent($newContent);

        $em->persist($newComponent);
        $em->flush();

        return $this->json([
            'message' => 'Component has been created.'
        ], 201);
    }

    #[Route('/api/components/delete/{id}', name: 'api_components_delete', methods: ['DELETE'])]
    public function deleteComponents(
        int $id,
        EntityManagerInterface $em
    ): Response
    {
        $component = $em->getRepository(Component::class)->find($id);

        if (!$component) {
            throw $this->createNotFoundException('Component does not exist.');
        }

        $em->remove($component);
        $em->flush();

        return $this->json([
            'message' => 'Component has been deleted.'
        ], 201);
    }
}
