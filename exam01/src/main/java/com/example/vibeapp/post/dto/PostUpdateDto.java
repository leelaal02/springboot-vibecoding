package com.example.vibeapp.post.dto;

import com.example.vibeapp.post.Post;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record PostUpdateDto(
        @NotNull(message = "게시글 번호는 필수입니다.") Long no,
        @NotBlank(message = "제목은 필수입니다.") @Size(max = 100, message = "제목은 최대 100자까지 입력 가능합니다.") String title,
        String content) {

    public Post toEntity(Post existingPost) {
        existingPost.setTitle(this.title);
        existingPost.setContent(this.content);
        existingPost.setUpdatedAt(LocalDateTime.now());
        return existingPost;
    }
}
