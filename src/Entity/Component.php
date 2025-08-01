<?php

namespace App\Entity;

use App\Repository\ComponentRepository;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity(repositoryClass: ComponentRepository::class)]
class Component
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'components')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\OneToOne(mappedBy: 'component', cascade: ['persist', 'remove'])]
    private ?ComponentContent $content = null;

    #[ORM\OneToOne(mappedBy: 'component', cascade: ['persist', 'remove'])]
    private ?Style $style = null;

    public function getId(): ?int { return $this->id; }
    public function getType(): ?string { return $this->type; }
    public function setType(string $type): static { $this->type = $type; return $this; }

    public function getProject(): ?Project { return $this->project; }
    public function setProject(?Project $project): static { $this->project = $project; return $this; }

    public function getContent(): ?ComponentContent { return $this->content; }
    public function setContent(?ComponentContent $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getStyle(): ?Style
    {
        return $this->style;
    }

    public function setStyle(Style $style): static
    {
        // set the owning side of the relation if necessary
        if ($style->getComponent() !== $this) {
            $style->setComponent($this);
        }

        $this->style = $style;

        return $this;
    }
}
