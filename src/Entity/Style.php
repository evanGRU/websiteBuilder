<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StyleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StyleRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['style:read']],
    denormalizationContext: ['groups' => ['style:write']]
)]
class Style
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['project:components:read', 'style:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'styles')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['project:components:read', 'style:read'])]
    private ?CssProperty $property = null;

    #[ORM\Column(length: 255)]
    #[Groups(['project:components:read', 'style:write', 'style:read'])]
    private ?string $value = null;

    #[ORM\ManyToOne(inversedBy: 'styles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Component $component = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProperty(): ?CssProperty
    {
        return $this->property;
    }

    public function setProperty(?CssProperty $property): static
    {
        $this->property = $property;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getComponent(): ?Component
    {
        return $this->component;
    }

    public function setComponent(?Component $component): static
    {
        $this->component = $component;
        return $this;
    }
}
