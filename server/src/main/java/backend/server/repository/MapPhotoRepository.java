package backend.server.repository;

import backend.server.entity.MapPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapPhotoRepository extends JpaRepository<MapPhoto,Long> {
}
