package com.example.vibeapp.post;

import com.example.vibeapp.post.dto.PostCreateDto;
import com.example.vibeapp.post.dto.PostResponseDto;
import com.example.vibeapp.post.dto.PostUpdateDto;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Map;

@Controller
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public String list(@RequestParam(value = "page", defaultValue = "1") int page, Model model) {
        int pageSize = 5;
        Map<String, Object> pagedData = postService.findPosts(page, pageSize);

        model.addAttribute("posts", pagedData.get("content"));
        model.addAttribute("currentPage", pagedData.get("currentPage"));
        model.addAttribute("totalPages", pagedData.get("totalPages"));
        model.addAttribute("totalElements", pagedData.get("totalElements"));

        // Calculate pagination range (e.g., show 5 pages at a time)
        int totalPages = (int) pagedData.get("totalPages");
        int startPage = Math.max(1, page - 2);
        int endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("hasPrev", page > 1);
        model.addAttribute("hasNext", page < totalPages);

        return "post/posts";
    }

    @GetMapping("/posts/{no}")
    public String detail(@PathVariable("no") Long no, Model model) {
        postService.increaseViewCount(no);
        PostResponseDto post = postService.getPost(no);
        model.addAttribute("post", post);
        return "post/post_detail";
    }

    @GetMapping("/posts/new")
    public String newForm(Model model) {
        model.addAttribute("postCreateDto", new PostCreateDto("", ""));
        return "post/post_new_form";
    }

    @PostMapping("/posts/add")
    public String create(@Valid @ModelAttribute PostCreateDto postCreateDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "post/post_new_form";
        }
        postService.createPost(postCreateDto);
        return "redirect:/posts";
    }

    @GetMapping("/posts/{no}/edit")
    public String editForm(@PathVariable("no") Long no, Model model) {
        PostResponseDto post = postService.getPost(no);
        model.addAttribute("post", post);
        model.addAttribute("postUpdateDto", new PostUpdateDto(post.no(), post.title(), post.content()));
        return "post/post_edit_form";
    }

    @PostMapping("/posts/{no}/save")
    public String update(@PathVariable("no") Long no, @Valid @ModelAttribute PostUpdateDto postUpdateDto,
            BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            PostResponseDto post = postService.getPost(no);
            model.addAttribute("post", post);
            return "post/post_edit_form";
        }
        postService.updatePost(postUpdateDto);
        return "redirect:/posts/" + no;
    }

    @PostMapping("/posts/{no}/delete")
    public String delete(@PathVariable("no") Long no) {
        postService.deletePost(no);
        return "redirect:/posts";
    }
}
