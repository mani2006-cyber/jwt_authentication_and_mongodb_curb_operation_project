Student Portal & Security Dashboard
Project Overview
A secure, full-stack web application designed for student management and vulnerability analysis. This portal integrates a modern frontend with a robust Node.js backend, featuring a secure authentication system that protects sensitive student data.

Core Features
Secure Authentication: User registration and login system utilizing Bcrypt for password hashing.

JWT Security: Authorization handled via JSON Web Tokens to protect private routes.

HttpOnly Cookie Implementation: Session persistence managed through secure cookies to prevent XSS-based token theft during page redirects.

Modern UI/UX: A professional Navy Blue/Slate themed interface featuring responsive forms and interactive dashboard elements.

Protected Dashboard: A private area for students to view grades, attendance, and financial status, accessible only to authenticated users.

<img width="1906" height="922" alt="image" src="https://github.com/user-attachments/assets/a2ae13e4-27a3-4108-b8df-501997059620" />

⚙️ Installation

1. Clone the Repository
git clone <your-repo-url>

cd backend

2. Install Dependencies
npm install

3. Start MongoDB

Make sure MongoDB is running on:

mongodb://127.0.0.1:27017

4. Run the Server
node server.js

Server will start at:

<img width="803" height="237" alt="image" src="https://github.com/user-attachments/assets/48d8b299-5fe2-40ac-a47e-fe1e57c584f0" />


http://localhost:8000


access the web at "http://localhost:8000/login.html";

<img width="1911" height="924" alt="image" src="https://github.com/user-attachments/assets/b3919075-4c84-46c7-9614-535215104edf" />


🗄️ Database
Database Name: userdb
Collection: users

Example document:

{
  "username": "mani",
  "password": "$2b$10$hashedpassword..."
}


🗄️ Database Name: student_information
Collection: students

Example document:

{
  "_id": {
    "$oid": "69da8e79424e2a61a7b6109c"
  },
  "username": "mani",
  "personal_info": {
    "first_name": "Manikanta",
    "last_name": "Gedda",
    "gender": "Male",
    "date_of_birth": "2006-06-19",
    "email": "manikantagedda2006@gmail.com",
    "phone": "6305041947",
    "address": {
      "street": "kottha veedhi",
      "city": "vizainagaram",
      "state": "Andhra Pradesh",
      "pincode": "535580",
      "village": "chintalavalasa"
    },
    "linkedin": "https://www.linkedin.com/in/manikanta-gedda-bb9a35343/",
    "github": "https://github.com/mani2006-cyber"
  },
  "grades": [
    {
      "semester": 1,
      "academic_year": "2023-2024",
      "semester_type": "Odd",
      "subjects": [
        {
          "code": "MATH101",
          "name": "Mathematics-I",
          "internal": 25,
          "external": 60,
          "total": 85,
          "credits": 4,
          "grade": "A"
        },
        {
          "code": "PHY101",
          "name": "Physics",
          "internal": 20,
          "external": 58,
          "total": 78,
          "credits": 4,
          "grade": "B"
        },
        {
          "code": "CSE101",
          "name": "Programming in C",
          "internal": 28,
          "external": 62,
          "total": 90,
          "credits": 3,
          "grade": "A"
        },
        {
          "code": "ENG101",
          "name": "English",
          "internal": 22,
          "external": 55,
          "total": 77,
          "credits": 2,
          "grade": "B"
        },
        {
          "code": "MECH101",
          "name": "Engineering Mechanics",
          "internal": 24,
          "external": 59,
          "total": 83,
          "credits": 3,
          "grade": "A"
        }
      ],
      "total_marks": 413,
      "max_marks": 500,
      "percentage": 82.6,
      "cgpa": 8.3,
      "result": "Pass"
    },
    {
      "semester": 2,
      "academic_year": "2023-2024",
      "semester_type": "Even",
      "subjects": [
        {
          "code": "MATH102",
          "name": "Mathematics-II",
          "internal": 26,
          "external": 61,
          "total": 87,
          "credits": 4,
          "grade": "A"
        },
        {
          "code": "CSE102",
          "name": "Data Structures",
          "internal": 27,
          "external": 61,
          "total": 88,
          "credits": 4,
          "grade": "A"
        },
        {
          "code": "ECE102",
          "name": "Digital Logic",
          "internal": 22,
          "external": 54,
          "total": 76,
          "credits": 3,
          "grade": "B"
        },
        {
          "code": "CSE103",
          "name": "OOP (Java)",
          "internal": 29,
          "external": 62,
          "total": 91,
          "credits": 3,
          "grade": "A"
        },
        {
          "code": "ENV101",
          "name": "Environmental Science",
          "internal": 23,
          "external": 56,
          "total": 79,
          "credits": 2,
          "grade": "B"
        }
      ],
      "total_marks": 421,
      "max_marks": 500,
      "percentage": 84.2,
      "cgpa": 8.5,
      "result": "Pass"
    },
    {
      "semester": 3,
      "academic_year": "2024-2025",
      "semester_type": "Odd",
      "subjects": [
        {
          "code": "CSE201",
          "name": "Database Management Systems",
          "internal": 28,
          "external": 60,
          "total": 88,
          "credits": 4,
          "grade": "A"
        },
        {
          "code": "CSE202",
          "name": "Operating Systems",
          "internal": 27,
          "external": 58,
          "total": 85,
          "credits": 4,
          "grade": "A"
        },
        {
          "code": "CSE203",
          "name": "Computer Networks",
          "internal": 25,
          "external": 57,
          "total": 82,
          "credits": 3,
          "grade": "A"
        },
        {
          "code": "CSE204",
          "name": "Software Engineering",
          "internal": 26,
          "external": 59,
          "total": 85,
          "credits": 3,
          "grade": "A"
        },
        {
          "code": "CSE205",
          "name": "Theory of Computation",
          "internal": 24,
          "external": 55,
          "total": 79,
          "credits": 3,
          "grade": "B"
        }
      ],
      "total_marks": 419,
      "max_marks": 500,
      "percentage": 83.8,
      "cgpa": 8.4,
      "result": "Pass"
    }
  ],
  "exam_schedule": [
    {
      "semester": 1,
      "exam_type": "FAT",
      "academic_year": "2023-2024",
      "subjects": [
        {
          "code": "MATH101",
          "name": "Mathematics-I",
          "date": "2023-10-10",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "PHY101",
          "name": "Physics",
          "date": "2023-10-12",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        },
        {
          "code": "CSE101",
          "name": "Programming in C",
          "date": "2023-10-14",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        },
        {
          "code": "ENG101",
          "name": "English",
          "date": "2023-10-16",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "MECH101",
          "name": "Engineering Mechanics",
          "date": "2023-10-18",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        }
      ]
    },
    {
      "semester": 2,
      "exam_type": "FAT",
      "academic_year": "2023-2024",
      "subjects": [
        {
          "code": "MATH102",
          "name": "Mathematics-II",
          "date": "2024-03-05",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        },
        {
          "code": "CSE102",
          "name": "Data Structures",
          "date": "2024-03-07",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "ECE102",
          "name": "Digital Logic",
          "date": "2024-03-09",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        },
        {
          "code": "CSE103",
          "name": "OOP (Java)",
          "date": "2024-03-11",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        },
        {
          "code": "ENV101",
          "name": "Environmental Science",
          "date": "2024-03-13",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        }
      ]
    },
    {
      "semester": 3,
      "exam_type": "FAT",
      "academic_year": "2024-2025",
      "subjects": [
        {
          "code": "CSE201",
          "name": "DBMS",
          "date": "2024-10-01",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        },
        {
          "code": "CSE202",
          "name": "Operating Systems",
          "date": "2024-10-03",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        },
        {
          "code": "CSE203",
          "name": "Computer Networks",
          "date": "2024-10-05",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "CSE204",
          "name": "Software Engineering",
          "date": "2024-10-07",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        },
        {
          "code": "CSE205",
          "name": "Theory of Computation",
          "date": "2024-10-09",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        }
      ]
    },
    {
      "semester": 4,
      "exam_type": "FAT",
      "academic_year": "2024-2025",
      "subjects": [
        {
          "code": "CSE206",
          "name": "Compiler Design",
          "date": "2025-03-02",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "CSE207",
          "name": "Machine Learning",
          "date": "2025-03-04",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        },
        {
          "code": "CSE208",
          "name": "Cloud Computing",
          "date": "2025-03-06",
          "time": "10:00 AM - 12:00 PM",
          "hall": "CB"
        },
        {
          "code": "CSE209",
          "name": "Cyber Security",
          "date": "2025-03-08",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-1"
        },
        {
          "code": "CSE210",
          "name": "Big Data Analytics",
          "date": "2025-03-10",
          "time": "10:00 AM - 12:00 PM",
          "hall": "AB-2"
        }
      ]
    }
  ],
  "hostel": {
    "hostel_name": "Boys Hostel A",
    "block": "AB",
    "room_number": "A-203",
    "floor": 2,
    "room_type": "Shared",
    "roommates": [
      {
        "name": "Ravi Kumar",
        "roll_no": "21CS101"
      },
      {
        "name": "Suresh Babu",
        "roll_no": "21CS102"
      }
    ],
    "warden": {
      "name": "Mr. Ramesh",
      "phone": "9876543211"
    },
    "check_in_date": "2023-08-01",
    "mess_plan": "Veg",
    "fees": {
      "hostel_fee": 50000,
      "mess_fee": 30000,
      "status": "Paid"
    }
  },
  "student_life": {
    "clubs": [
      {
        "name": "Coding Club",
        "role": "Member",
        "joined_year": 2023
      },
      {
        "name": "cyber Club",
        "role": "Coordinator",
        "joined_year": 2024
      }
    ],
    "events_participated": [
      {
        "event_name": "Hackathon 2024",
        "type": "Technical",
        "achievement": "2nd Prize",
        "date": "2024-02-15"
      },
      {
        "event_name": "Tech Fest",
        "type": "Workshop",
        "date": "2023-11-20"
      }
    ],
    "sports": [
      {
        "name": "Cricket",
        "level": "College",
        "position": "Batsman"
      },
      {
        "name": "Badminton",
        "level": "Inter-College"
      }
    ],
    "certifications": [
      {
        "name": "cyber-analyst",
        "platform": "IBM",
        "year": 2025
      }
    ],
    "volunteering": [
      {
        "activity": "NSS Volunteer",
        "description": "Participated in social service activities",
        "year": 2023
      }
    ],
    "achievements": [
      "Won coding contest",
      "Top 3rd performer in hackathon"
    ],
    "hobbies": [
      "Coding",
      "Gaming",
      "Reading"
    ]
  },
  "academic_info": {
    "current_course": {
      "degree": "B.Tech",
      "branch": "Computer Science and Engineering",
      "year": 3,
      "semester": 6,
      "roll_number": "23bce9984",
      "section": "A",
      "academic_year": "2025-2026"
    },
    "education_history": [
      {
        "level": "10th",
        "board": "SSC",
        "school_name": "APRS School",
        "year_of_passing": 2021,
        "percentage": 90.5
      },
      {
        "level": "Intermediate",
        "board": "State Board",
        "college_name": "sri viswa Junior College",
        "year_of_passing": 2023,
        "percentage": 96.4,
        "stream": "MPC"
      }
    ],
    "cgpa_details": {
      "semester_wise": [
        {
          "semester": 1,
          "sgpa": 8.3
        },
        {
          "semester": 2,
          "sgpa": 8.5
        },
        {
          "semester": 3,
          "sgpa": 8.4
        },
        {
          "semester": 4,
          "sgpa": 8.6
        },
        {
          "semester": 5,
          "sgpa": 9.6
        }
      ],
      "overall_cgpa": 8.57
    },
    "backlogs": {
      "active": 0,
      "history": []
    },
    "attendance": {
      "overall_percentage": 87,
      "semester_wise": [
        {
          "semester": 1,
          "percentage": 85
        },
        {
          "semester": 2,
          "percentage": 88
        },
        {
          "semester": 3,
          "percentage": 86
        },
        {
          "semester": 4,
          "percentage": 89
        },
        {
          "semester": 5,
          "percentage": 86
        }
      ]
    },
    "projects": [
      {
        "title": "Student Management System",
        "type": "Mini Project",
        "technologies": [
          "Java",
          "MySQL"
        ],
        "year": 2024
      },
      {
        "title": "JWT Authentication System",
        "type": "Major Project",
        "technologies": [
          "Node.js",
          "MongoDB"
        ],
        "year": 2025
      }
    ],
    "internships": [
      {
        "company": "Tech Solutions",
        "role": "Backend Developer Intern",
        "duration": "3 months",
        "year": 2025
      }
    ]
  },
  "placemets": [],
  "finance": {
    "fee_structure": {
      "tuition_fee": 80000,
      "hostel_fee": 50000,
      "mess_fee": 30000,
      "other_charges": 10000,
      "total_fee": 170000
    },
    "payments": [
      {
        "payment_id": "PAY12345",
        "amount": 85000,
        "payment_mode": "Online",
        "transaction_id": "TXN987654",
        "date": "2024-08-10",
        "status": "Success"
      },
      {
        "payment_id": "PAY12346",
        "amount": 85000,
        "payment_mode": "UPI",
        "transaction_id": "TXN123456",
        "date": "2025-01-15",
        "status": "Success"
      }
    ],
    "dues": {
      "pending_amount": 0,
      "last_due_date": "2025-02-01",
      "status": "Cleared"
    },
    "scholarships": [
      {
        "name": "Merit Scholarship",
        "amount": 20000,
        "year": 2024,
        "status": "Approved"
      }
    ],
    "fines": [
      {
        "reason": "Library late return",
        "amount": 200,
        "date": "2024-09-10",
        "status": "Paid"
      }
    ],
    "refunds": [
      {
        "amount": 5000,
        "reason": "Excess fee adjustment",
        "date": "2025-03-01",
        "status": "Processed"
      }
    ],
    "bank_details": {
      "account_holder": "Manikanta G",
      "bank_name": "SBI",
      "account_number": "XXXX1234",
      "ifsc": "SBIN0001234"
    }
  },
  "contact_us": {
    "institution_name": "VIT-AP University",
    "address": {
      "street": "Near AP Secretariat",
      "area": "Inavolu Village",
      "city": "Amaravati",
      "state": "Andhra Pradesh",
      "pincode": "522237",
      "country": "India"
    },
    "contact_numbers": [
      {
        "type": "Main Office",
        "number": "+91-863-2370444"
      },
      {
        "type": "Admissions Office",
        "number": "+91-863-2370555"
      },
      {
        "type": "Hostel Office",
        "number": "+91-863-2370666"
      }
    ],
    "email_addresses": [
      {
        "type": "General Inquiry",
        "email": "info@vitap.ac.in"
      },
      {
        "type": "Admissions",
        "email": "admissions@vitap.ac.in"
      },
      {
        "type": "Support",
        "email": "support@vitap.ac.in"
      }
    ],
    "working_hours": {
      "monday_to_friday": "9:00 AM - 5:00 PM",
      "saturday": "9:00 AM - 1:00 PM",
      "sunday": "Closed"
    },
    "departments": [
      {
        "name": "Computer Science Engineering",
        "email": "cse@vitap.ac.in",
        "phone": "+91-863-2370701"
      },
      {
        "name": "Electronics and Communication Engineering",
        "email": "ece@vitap.ac.in",
        "phone": "+91-863-2370702"
      }
    ],
    "social_media": {
      "website": "https://vitap.ac.in",
      "linkedin": "https://linkedin.com/school/vit-ap",
      "instagram": "https://instagram.com/vitapuniversity",
      "youtube": "https://youtube.com/@vitap"
    },
    "map_location": {
      "latitude": 16.496,
      "longitude": 80.5
    }
  }
}

