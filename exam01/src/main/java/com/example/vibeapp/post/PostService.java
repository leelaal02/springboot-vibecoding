package com.example.vibeapp.post;

import com.example.vibeapp.post.dto.PostCreateDto;
import com.example.vibeapp.post.dto.PostListDto;
import com.example.vibeapp.post.dto.PostResponseDto;
import com.example.vibeapp.post.dto.PostUpdateDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Transactional(readOnly = true)
    public PostResponseDto getPost(Long no) {
        Post post = postRepository.findById(no);
        return PostResponseDto.from(post);
    }

    public void createPost(PostCreateDto createDto) {
        Post post = createDto.toEntity();
        postRepository.save(post);
    }

    public void updatePost(PostUpdateDto updateDto) {
        Post post = postRepository.findById(updateDto.no());
        if (post != null) {
            updateDto.toEntity(post);
            // JPA Dirty Checking: Transaction commit will detect changes and execute UPDATE
            // SQL automatically.
        }
    }

    public void deletePost(Long no) {
        postRepository.deleteById(no);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> findPosts(int page, int size) {
        List<Post> posts = postRepository.findPaged(page, size);
        List<PostListDto> content = posts.stream()
                .map(PostListDto::from)
                .collect(Collectors.toList());
        int totalElements = postRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        Map<String, Object> result = new HashMap<>();
        result.put("content", content);
        result.put("totalPages", totalPages);
        result.put("totalElements", totalElements);
        result.put("currentPage", page);
        result.put("pageSize", size);

        return result;
    }

    public void increaseViewCount(Long no) {
        postRepository.increaseViews(no);
        // JPA Dirty Checking applies here too as entity is modified within transaction.
    }
}
