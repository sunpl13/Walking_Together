package backend.server.repository.admin;

import com.querydsl.core.Tuple;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ActivitySearchRepository {

    public List<Tuple> activityInfo(String keyword, LocalDate from, LocalDate to, boolean activityDivision);

    public void activityDetail(Long activityId);
}
