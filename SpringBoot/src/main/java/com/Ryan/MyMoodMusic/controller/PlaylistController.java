package com.Ryan.MyMoodMusic.controller;


import com.Ryan.MyMoodMusic.dto.DeleteDto;
import com.Ryan.MyMoodMusic.dto.MusicDto;
import com.Ryan.MyMoodMusic.service.PlaylistService;
import com.Ryan.MyMoodMusic.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;


    @PostMapping("/saveMusic")
    public ResponseEntity<String> addMusic(@RequestBody MusicDto musicDto) {
        String result = playlistService.saveMusic(musicDto);
        if("playlist created successfully!".equals(result)){
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(404).body(result);
        }
    }

    @GetMapping("/{userId}/playlists")
    public ResponseEntity<List<MusicDto>> getUserPlaylists(@PathVariable Long userId) {
        List<MusicDto> result = playlistService.getUserPlaylists(userId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) {
        Optional<User> result = playlistService.getUserByUsername(username);
        return result.map(user -> ResponseEntity.ok(user.getId()))
                .orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/deletePlaylist")
    public ResponseEntity<String> deletePlaylist(@RequestBody DeleteDto deleteDto) {
        System.out.println("Received delete request for playlistUrl: " + deleteDto.getPlaylists());
        try{
            boolean result = playlistService.deletePlaylist(deleteDto.getPlaylists());
            if(result) {
                return new ResponseEntity<>("playlist deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("playlist not found", HttpStatus.NOT_FOUND);
            }
        } catch(Exception e) {
            return new ResponseEntity<>("Error occuerd", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
