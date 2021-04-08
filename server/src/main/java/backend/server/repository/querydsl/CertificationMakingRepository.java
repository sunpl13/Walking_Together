package backend.server.repository.querydsl;

import backend.server.entity.Certification;

import java.util.List;
import java.util.Map;

public interface CertificationMakingRepository {

    public List<Certification> getCertification(String from, String to, String stdId);
}
