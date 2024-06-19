package com.Ryan.MyMoodMusic.playlist;


import com.Ryan.MyMoodMusic.dto.MusicDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistRepository playlistRepository;


    @PostMapping("/saveMusic")
    String addMusic(@RequestBody MusicDto musicDto){
        System.out.println(musicDto.getPlaylists());
        System.out.println(musicDto.getPlaylistsUrl());
        System.out.println(musicDto.getUsername());
        return null;
    }
}
