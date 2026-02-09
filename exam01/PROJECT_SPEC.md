# Project Specification: VibeApp

최소 기능 스프링부트 애플리케이션을 생성하는 프로젝트 명세서입니다.

## 1. 프로젝트 설정 (Project Settings)

- **JDK Version**: JDK 21
- **Language**: Java
- **Spring Boot Version**: 3.4.1
- **Build Tool**: Gradle 9.3.0
- **DSL**: Groovy DSL
- **Dependencies**: 
    - `spring-boot-starter`
    - `spring-boot-starter-web` (REST API 지원)
    - `spring-boot-starter-thymeleaf` (뷰 템플릿 엔진 지원)
    - `spring-boot-starter-validation` (데이터 검증 지원)
    - `spring-boot-starter-jdbc` (JDBC 지원)
    - `mybatis-spring-boot-starter` (MyBatis ORM 지원)
    - `com.h2database:h2` (In-memory Database)
    - `spring-boot-starter-test` (테스트 지원)
    - `junit-platform-launcher`

## 2. 프로젝트 메타데이터 (Project Metadata)

- **Group**: `com.example`
- **Artifact**: `vibeapp`
- **Main Class Name**: `com.example.vibeapp.VibeApp`
- **Description**: 최소 기능 스프링부트 애플리케이션을 생성하는 프로젝트다.
- **Configuration**: YAML 파일 사용 (`application.yml`)

## 3. 플러그인 (Plugins)

- `org.springframework.boot` (version 3.4.1)
- `io.spring.dependency-management` (version 1.1.7)
- `java`

## 4. 구현된 기능 및 API (Implemented Features & APIs)

### 게시글 기능 (Post Features)
- **목록 조회 (List)**: 게시글 목록을 페이징 처리하여 표시한다.
- **페이징 처리 (Pagination)**: 목록 조회 시 페이지당 5개의 게시글을 표시하며, 하단에 이동 네비게이션을 제공한다.
- **상세 조회 (Detail)**: 게시글의 제목과 내용을 확인할 수 있다.
- **조회수 증폭 (View Count)**: 게시글 상세 페이지 접근 시 조회수가 1씩 증가한다 (DB Update).
- **CRUD**: 게시글 작성, 수정, 삭제 기능을 제공한다.
- **수정 처리 (Update)**: 기존 게시글의 제목과 내용을 수정할 수 있으며, `updatedAt` 필드가 갱신된다.
- **DTO 사용**: 데이터 전송 객체(DTO)를 통해 입출력 데이터를 관리한다.

### API 명세
- **Endpoint**: `/api/hello`
  - **HTTP Method**: GET
  - **Description**: "Hello, Vibe!" 문자열을 반환하는 기본 API
- **Endpoint**: `/posts` (GET): 게시글 목록 (페이징 적용)
- **Endpoint**: `/posts/{no}` (GET): 게시글 상세 조회 (조회수 증가 포함)
- **Endpoint**: `/posts/new` (GET): 게시글 작성 폼
- **Endpoint**: `/posts/add` (POST): 게시글 등록
- **Endpoint**: `/posts/{no}/edit` (GET): 게시글 수정 폼
- **Endpoint**: `/posts/{no}/save` (POST): 게시글 수정 처리 (Redirect to Detail)
- **Endpoint**: `/posts/{no}/delete` (POST): 게시글 삭제 처리 (Redirect to List)

## 5. 프로젝트 구조 (Project Structure)

```text
vibeapp/
├── build.gradle
├── settings.gradle
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── vibeapp/
│   │   │               ├── VibeApp.java (Main Class)
│   │   │               ├── config/
│   │   │               │   └── H2ConsoleConfig.java (H2 Console 설정)
│   │   │               ├── home/ (Home Feature)
│   │   │               │   └── HomeController.java
│   │   │               └── post/ (Post Feature)
│   │   │                   ├── Post.java (Entity)
│   │   │                   ├── PostController.java
│   │   │                   ├── PostRepository.java (MyBatis Mapper Interface)
│   │   │                   ├── PostService.java
│   │   │                   └── dto/ (Data Transfer Objects)
│   │   │                       ├── PostCreateDto.java
│   │   │                       ├── PostListDto.java
│   │   │                       ├── PostResponseDto.java
│   │   │                       └── PostUpdateDto.java
│   │   └── resources/
│   │       ├── mapper/
│   │       │   └── post/
│   │       │       └── PostMapper.xml (MyBatis SQL)
│   │       ├── templates/
│   │       │   ├── home/
│   │       │   │   └── home.html (Main Home)
│   │       │   └── post/
│   │       │       ├── posts.html (Post List)
│   │       │       ├── post_detail.html (Post Detail)
│   │       │       ├── post_new_form.html (Create Form)
│   │       │       └── post_edit_form.html (Edit Form)
│   │       ├── application.yml
│   │       └── schema.sql (Table Schema)
└── gradlew
```

## 6. 상세 설정 사항

### 패키지 구조 (Feature-Based Package)
- 기능별로 패키지를 분리하여 관리한다 (`home`, `post`).

### 데이터베이스 (Database)
- **H2 Database**: 로컬 개발 및 테스트용 In-memory DB 사용.
- **MyBatis**: SQL 매퍼 프레임워크를 사용하여 Java 객체와 DB 테이블을 매핑.
- **Schema Initialization**: `schema.sql`을 통해 애플리케이션 시작 시 `POSTS` 테이블을 자동 생성 (IF NOT EXISTS).
- **H2 Console**: `/h2-console` 경로로 웹 콘솔 접근 가능.

### Post 관련 클래스
- **PostRepository.java**: MyBatis `@Mapper` 인터페이스로 정의되어 XML 매퍼와 연결된다.
- **PostService.java**: 트랜잭션 및 비즈니스 로직을 담당하며, DTO 변환 및 Repository 호출을 수행한다.
- **PostMapper.xml**: 실제 SQL 쿼리(`SELECT`, `INSERT`, `UPDATE`, `DELETE`)가 정의된 파일.

## 7. 프론트엔드 설정 (Frontend Settings)

- **CSS Framework**: Tailwind CSS (게시판 관련 페이지), Bootstrap 5.3.3 (홈 페이지)
- **Design Consistency**: 상단 헤더, 로고, 네비게이션 구성을 통일하여 일관된 사용자 경험을 제공한다.
