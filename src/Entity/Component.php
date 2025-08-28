<?php

namespace App\Entity;

use App\Repository\ComponentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: ComponentRepository::class)]
class Component
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['project:components:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['project:components:read'])]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'components')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\OneToOne(mappedBy: 'component', cascade: ['persist', 'remove'])]
    #[Groups(['project:components:read'])]
    private ?ComponentContent $content = null;

    /**
     * @var Collection<int, Style>
     */
    #[ORM\OneToMany(targetEntity: Style::class, mappedBy: 'component', cascade: ['persist', 'remove'])]
    #[Groups(['project:components:read'])]
    private Collection $styles;

    public function __construct()
    {
        $this->styles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type; return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): static
    {
        $this->project = $project; return $this;
    }

    public function getContent(): ?ComponentContent
    {
        return $this->content;
    }

    public function setContent(?ComponentContent $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getStyles(): Collection
    {
        return $this->styles;
    }

    public function addStyle(Style $style): self
    {
        if (!$this->styles->contains($style)) {
            $this->styles[] = $style;
            $style->setComponent($this);
        }

        return $this;
    }

    public function removeStyle(Style $style): self
    {
        if ($this->styles->removeElement($style)) {
            if ($style->getComponent() === $this) {
                $style->setComponent(null);
            }
        }

        return $this;
    }
}
