package backend.server.repository;

import backend.server.entity.Certification;
import backend.server.repository.querydsl.CertificationMakingRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long>, CertificationMakingRepository {

    Optional<Certification> findCertificationByStdId(String stdId);
}
