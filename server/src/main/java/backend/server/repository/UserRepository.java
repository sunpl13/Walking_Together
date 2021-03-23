package backend.server.repository;

import backend.server.entity.Member;
import backend.server.repository.admin.MemberSearchRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Member, Long>, MemberSearchRepository {

    // 쿼리가 수행될 때 Eager 조회로 authorities 정보를 가져오게 된다.
    @EntityGraph(attributePaths = "authorities")
    // stdId를 기준으로 User 정보를 가져올 때 권한 정보도 같이 가져옴
    Optional<Member> findOneWithAuthoritiesByStdId(String stdId);

    // 학번으로 회원 찾기
    Optional<Member> findMemberByStdIdAndNameAndBirth(String stdId, String name, String birth);

    // 이메일로 회원 찾기
    Optional<Member> findMemberByEmail(String email);

    Optional<Member> findMemberByStdId(String stdId);

}
