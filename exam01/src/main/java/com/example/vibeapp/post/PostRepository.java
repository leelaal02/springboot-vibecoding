package com.example.vibeapp.post;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostRepository {

    @PersistenceContext
    private EntityManager em;

    public Post findById(Long no) {
        return em.find(Post.class, no);
    }

    public void save(Post post) {
        if (post.getNo() == null) {
            em.persist(post);
        } else {
            em.merge(post);
        }
    }

    public void deleteById(Long no) {
        Post post = findById(no);
        if (post != null) {
            em.remove(post);
        }
    }

    public void increaseViews(Long no) {
        Post post = findById(no);
        if (post != null) {
            post.setViews(post.getViews() + 1);
        }
    }

    public int count() {
        return em.createQuery("SELECT COUNT(p) FROM Post p", Long.class)
                .getSingleResult()
                .intValue();
    }

    public List<Post> findPaged(int page, int size) {
        return em.createQuery("SELECT p FROM Post p ORDER BY p.no DESC", Post.class)
                .setFirstResult((page - 1) * size)
                .setMaxResults(size)
                .getResultList();
    }
}
