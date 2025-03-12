import { Component, OnInit } from '@angular/core';

interface Booking {
  date: string;
  time: string;
  status: string;
}

interface Facility {
  key: string;
  name: string;
  icon: string;
  image: string;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  
  facilityList: Facility[] = [
    { key: 'snooker', name: 'โต๊ะสนุ๊ก', icon: '🎱', image: 'โต๊ะสนุ๊ก.webp' },
    { key: 'tennis', name: 'สนามเทนนิส', icon: '🎾', image: 'สนามเทนนิส.webp' },
    { key: 'badminton', name: 'สนามแบดมินตัน', icon: '🏸', image: 'สนามแบต.webp' },
    { key: 'football', name: 'สนามฟุตบอล', icon: '⚽', image: 'สนามฟุตบอล.webp' },
    { key: 'banquet', name: 'ห้องจัดเลี้ยง', icon: '🍽️', image: 'ห้องจัดเลี้ยง.webp' }
  ];

  bookings: { [key: string]: Booking[] } = {
    snooker: [
      { date: "2025-03-11", time: "14:00 - 16:00 น.", status: "ไม่ว่าง" },
      { date: "2025-03-12", time: "10:00 - 12:00 น.", status: "ไม่ว่าง" }
    ],
    tennis: [
      { date: "2025-03-10", time: "09:00 - 11:00 น.", status: "ไม่ว่าง" },
      { date: "2025-03-12", time: "15:00 - 17:00 น.", status: "ไม่ว่าง" }
    ],
    badminton: [
      { date: "2025-03-09", time: "13:00 - 15:00 น.", status: "ไม่ว่าง" }
    ],
    football: [
      { date: "2025-03-08", time: "18:00 - 20:00 น.", status: "ไม่ว่าง" },
      { date: "2025-03-11", time: "14:00 - 16:00 น.", status: "ไม่ว่าง" }
    ],
    banquet: [
      { date: "2025-03-07", time: "12:00 - 14:00 น.", status: "ไม่ว่าง" },
      { date: "2025-03-10", time: "17:00 - 19:00 น.", status: "ไม่ว่าง" },
      { date: "2025-03-11", time: "14:00 - 16:00 น.", status: "ไม่ว่าง" }
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  // ฟังก์ชันแปลงวันที่เป็น "DD/MM/YYYY"
  formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }
}
