package backend.server.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@RequiredArgsConstructor
@Component
public class S3ServiceImpl implements S3Service {


    private String bucket = "walkingtogether";

    private final AmazonS3Client amazonS3Client;
    private final S3Component s3Component;

    // 파일을 업로드
    @Override
    public void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(
                s3Component.getBucket(), fileName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    // 업로드한 파일의 URL을 가져옴
    @Override
    public String getFileUrl(String fileName) {
        // 업로드된 파일의 URI를 가져옴
        return String.valueOf(amazonS3Client.getUrl(s3Component.getBucket(), fileName));
    }

    // 업로드된 파일을 삭제 (서버에서)
    @Override
    public void deleteFile(String fileName) {
        try {
            //Delete
            amazonS3Client.deleteObject(bucket, fileName);
            System.out.println(String.format("[%s] deletion complete", fileName));

        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }
}
