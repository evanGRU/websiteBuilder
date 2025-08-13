<?php

namespace App\Entity;

use App\Repository\CssPropertyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CssPropertyRepository::class)]
class CssProperty
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['project:components:read', 'style:read'])]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    #[Groups(['project:components:read', 'style:read'])]
    private ?string $name = null;

    /**
     * @var Collection<int, Style>
     */
    #[ORM\OneToMany(targetEntity: Style::class, mappedBy: 'property')]
    private Collection $styles;

    public function __construct()
    {
        $this->styles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Style>
     */
    public function getStyles(): Collection
    {
        return $this->styles;
    }

    public function addStyle(Style $style): static
    {
        if (!$this->styles->contains($style)) {
            $this->styles->add($style);
            $style->setProperty($this);
        }

        return $this;
    }

    public function removeStyle(Style $style): static
    {
        if ($this->styles->removeElement($style)) {
            // set the owning side to null (unless already changed)
            if ($style->getProperty() === $this) {
                $style->setProperty(null);
            }
        }

        return $this;
    }
}
