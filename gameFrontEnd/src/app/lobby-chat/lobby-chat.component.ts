import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent implements OnInit {

  messageForm = new FormGroup({
    message: new FormControl(null)
  })

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  onSendMessage(data: any) {
    this.chat.sendMessage(data.value).subscribe()
  }

}
