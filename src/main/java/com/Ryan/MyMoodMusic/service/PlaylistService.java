package com.Ryan.MyMoodMusic.service;

import com.Ryan.MyMoodMusic.dto.MusicDto;
import com.Ryan.MyMoodMusic.playlist.Playlist;
import com.Ryan.MyMoodMusic.playlist.PlaylistRepository;
import com.Ryan.MyMoodMusic.user.User;
import com.Ryan.MyMoodMusic.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    public String saveMusic( MusicDto musicDto){
        String playlists = musicDto.getPlaylists();
        String playlistsUrl = musicDto.getPlaylistsUrl();
        String username = musicDto.getUsername();
        Optional<User> result = userRepository.findByUsername(username);

        if(result.isPresent()){
            User user = result.get();

            Playlist playlist = new Playlist();
            playlist.setPlaylists(playlists);
            playlist.setPlaylistsUrl(playlistsUrl);
            playlist.setUser(user);

            playlistRepository.save(playlist);

            return "playlist created successfully!";
        } else {
            return "User not found";
        }

    }

    public List<MusicDto> getUserPlaylists(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return playlistRepository.findByUser(user)
                    .stream()
                    .map(playlist -> {
                        MusicDto dto = new MusicDto();
                        dto.setPlaylists(playlist.getPlaylists());
                        dto.setPlaylistsUrl(playlist.getPlaylistsUrl());
//                        dto.setUsername(user.getUsername());
                        return dto;
                    })
                    .collect(Collectors.toList());
        } else {
            return List.of();
        }

    }


    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
