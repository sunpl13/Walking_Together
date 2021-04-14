package backend.server.repository;

import backend.server.entity.MemberProfilePictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberProfilePicturesRepository extends JpaRepository<MemberProfilePictures, Long> {

    public MemberProfilePictures findMemberProfilePicturesByStdId(String stdId);
}
