package backend.server.repository;

import backend.server.entity.Partner;
import backend.server.repository.admin.PartnerSearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long>, PartnerSearchRepository {
}
