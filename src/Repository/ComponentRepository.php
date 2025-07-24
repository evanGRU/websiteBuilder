<?php

namespace App\Repository;

use App\Entity\Component;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Component>
 */
class ComponentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Component::class);
    }

    public function findByProjectWithContent(int $projectId): array
    {
        $request = $this->createQueryBuilder('c')
            ->join('c.project', 'p')
            ->leftJoin('c.content', 'content')
            ->addSelect('content')
            ->where('p.id = :projectId')
            ->setParameter('projectId', $projectId);

        return $request->getQuery()->getResult();
    }

//    /**
//     * @return Component[] Returns an array of Component objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Component
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
