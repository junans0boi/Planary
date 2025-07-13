package com.hollywood.planary.service;

import com.hollywood.planary.entity.Tag;
import com.hollywood.planary.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepo;

    public TagService(TagRepository repo) {
        this.tagRepo = repo;
    }

    public List<Tag> findTagsByUser(Long userId) {
        return tagRepo.findByUserUserId(userId);
    }

    @Transactional
    public Tag createTag(Tag tag) {
        return tagRepo.save(tag);
    }

    @Transactional
    public Tag updateTag(Long id, Tag dto) {
        Tag tag = tagRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tag not found"));
        tag.setName(dto.getName());
        tag.setColor(dto.getColor());
        return tagRepo.save(tag);
    }

    @Transactional
    public void deleteTag(Long id) {
        tagRepo.deleteById(id);
    }
}