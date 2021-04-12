package backend.server.repository.querydsl;

import com.querydsl.core.Tuple;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ActivitySearchRepositoryImplTest {

    @Autowired
    public ActivitySearchRepository repository;

    @Test
    public void 관리자_활동_상세() {

        List<Tuple> tuples = repository.activityInfo(null, null, null, 0);

        System.out.println(tuples);
    }

}