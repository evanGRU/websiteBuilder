<?php

namespace App\Repository;

use App\Entity\Text;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Text>
 */
class TextRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Text::class);
    }

    public function findByComponent($componentId): array
    {
        return $this->createQueryBuilder('t')
            ->join('t.component', 'c')
            ->andWhere('c.id = :componentId')
            ->setParameter('componentId', $componentId)
            ->getQuery()
            ->getResult();
    }


//    /**
//     * @return Text[] Returns an array of Text objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Text
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
