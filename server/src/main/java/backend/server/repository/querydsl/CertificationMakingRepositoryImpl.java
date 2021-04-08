package backend.server.repository.querydsl;

import backend.server.DTO.CertificationDTO;
import backend.server.entity.Certification;
import backend.server.entity.QCertification;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CertificationMakingRepositoryImpl extends QuerydslRepositorySupport implements CertificationMakingRepository {

    public CertificationMakingRepositoryImpl() {
        super(Certification.class);
    }

    @Override
    public List<Certification> getCertification(String from, String to, String stdId) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate fromDate = LocalDate.parse(from, formatter);
        LocalDate toDate = LocalDate.parse(to, formatter);

        QCertification certification = QCertification.certification;

        JPQLQuery<Certification> jpqlQuery = from(certification);

        jpqlQuery.where(certification.stdId.eq(stdId));
        jpqlQuery.where(certification.activityDate.between(fromDate, toDate));

        List<Certification> result = jpqlQuery.fetch();
        return result;
    }

}
