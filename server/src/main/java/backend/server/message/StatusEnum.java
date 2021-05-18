package backend.server.message;

public enum StatusEnum {

    OK(200, "OK"),
    NO_CONTENT(204, "NO_CONTENT"),
    BAD_REQUEST(400, "BAD_REQUEST"), // 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없을 때
    FORBIDDEN(403, "FORBIDDEN"), // 유효성 검증 실패
    NOT_FOUND(404, "NOT_FOUND"),
    CONFLICT(409, "CONFLICT"), // 요청이 현재 서버의 상태와 충돌
    INTERNAL_SERVER_ERROR(500, "INTERNAL_SERVER_ERROR");

    int statusCode;
    String code;

    StatusEnum(int statusCode, String code) {
        this.statusCode = statusCode;
        this.code = code;
    }

}
