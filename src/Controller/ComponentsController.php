<?php

namespace App\Controller;

use App\Entity\Component;
use App\Entity\CssProperty;
use App\Entity\Project;
use App\Entity\Style;
use App\Entity\Text;
use App\Repository\ComponentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

        foreach ($data['styles'] as $styleObject) {
            $property = $em->getRepository(CssProperty::class)->findOneBy(['code' => $styleObject['property']['code']]);

            $newStyle = new Style();
            $newStyle->setProperty($property);
            $newStyle->setComponent($newComponent);
            $newStyle->setValue($styleObject['value']);

            $newComponent->addStyle($newStyle);
        }


        $newContent = [];
        switch ($data['type']) {
            case "text":
                $newContent = new Text();
                $newContent->setTag($data['content']['tag']);
                $newContent->setValue($data['content']['value']);
                break;
            default:
                break;
        }
        $newContent->setComponent($newComponent);

        $newComponent->setContent($newContent);

        $em->persist($newComponent);
        $em->flush();

        return $this->json($newComponent, 201, [], [
            'groups' => ['project:components:read']
        ]);
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

    #[Route('api/components/{id}/update', methods: ['PATCH'])]
    public function updateComponentValue(
        int $id,
        Request $request,
        ComponentRepository $componentRepository,
        EntityManagerInterface $em
    ): JsonResponse {
        $component = $componentRepository->find($id);

        if (!$component) {
            return $this->json(['error' => 'Component not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['value'])) {
            $content = $component->getContent();

            if ($content instanceof Text) {
                $content->setValue($data['value']);
                $em->persist($content);
                $em->flush();
            }
        }

        return $this->json($component, 200, [], ['groups' => 'project:components:read']);
    }

}
