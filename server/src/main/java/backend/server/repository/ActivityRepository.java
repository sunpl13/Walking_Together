package backend.server.repository;

import backend.server.entity.Activity;
import backend.server.repository.querydsl.ActivitySearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long>, ActivitySearchRepository {

    @Query("select p.partnerName, p.partnerDetail, p.partnerBirth, p.partnerId from Partner p left join p.member where p.member.stdId = :stdId")
    List<List<Object>> getPartnerList(@Param("stdId") String stdId);

    Optional<List<Activity>> findActivitiesByPartner_PartnerId(Long partnerId);
}
