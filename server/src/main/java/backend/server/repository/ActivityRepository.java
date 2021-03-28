package backend.server.repository;

import backend.server.entity.Activity;
import backend.server.repository.admin.ActivitySearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long>, ActivitySearchRepository {
}
