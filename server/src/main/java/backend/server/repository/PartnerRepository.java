package backend.server.repository;

import backend.server.entity.Partner;
import backend.server.repository.querydsl.PartnerSearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long>, PartnerSearchRepository {

    @Query("SELECT p " +
            "FROM Partner p " +
            "WHERE p.partnerId = :partnerId ")
    Optional<Partner> getPartnerInformation(@Param("partnerId") Long partnerId);

    Optional<Partner> findPartnerByActivity_ActivityId(Long activityID);
}

