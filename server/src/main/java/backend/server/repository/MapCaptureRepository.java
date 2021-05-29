package backend.server.repository;

import backend.server.entity.MapCapture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.HashMap;

public interface MapCaptureRepository extends JpaRepository<MapCapture, Long> {

    public ArrayList<Object> findAllByActivityId(Long activityId);
}
