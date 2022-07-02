import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, throwError } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameData } from '../models/game-data';

const CHAT_URL = 'ws://localhost:3000/cable';

export interface Message {
  command?: string;
  type?: string;
  game?: GameData;
}

@Injectable({
  providedIn: 'root',
})

export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public message: Subject<Message>;
  public connected: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  constructor() {
    this.message = <Subject<Message>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Message => {
        if (response.data.type != 'ping') {
          console.log(response.data);
        }
        let data = JSON.parse(response.data);
        return data;
      }),
      tap((data)=>{
        if(data.type == "welcome"){
          this.connected.next(true)
        }
      })
    );
  }

  public connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: () => {},
      complete: () => {},
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
