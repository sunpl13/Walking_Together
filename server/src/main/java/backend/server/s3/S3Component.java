package backend.server.s3;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter // 필요
@ConfigurationProperties(prefix = "cloud.aws.s3")   // properties의 값을 불러옴 (버킷값)
@Component  // S3의 버킷 정보를 가져옴
public class S3Component {

    private String bucket;
}
