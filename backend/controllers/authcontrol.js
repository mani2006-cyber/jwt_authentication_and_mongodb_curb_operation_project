const path = require("path");
const bcrypt = require('bcrypt');

const { contactdetailes, getDB } = require("../database/mongodb.js");

const dashboard = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../frontend/private/dashboard.html"));
}

const about = async(req, res) => {


    const { username } = req.user;

    if (!username) {
        return res.status(404).json({ message: "token is expired or authentication failed " })
    }



    const db = contactdetailes();

    const user = await db.collection("students").findOne({ "username": username });

    if (!user) {
        return res.status(401).json({ message: "user not found " + username });
    }

    const info = user.personal_info;

    const html = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1200px; margin: 30px auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">
    
    <div style="background: linear-gradient(135deg, #003366 0%, #00509e 100%); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Student Profile Dashboard</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.8;">Academic Year 2025-26</p>
    </div>

    <div style="padding: 40px;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 0 10px;">
            
            <thead>
                <tr>
                    <th colspan="2" style="text-align: left; font-size: 20px; color: #003366; padding: 10px 0; border-bottom: 2px solid #eef2f6;">
                        <span style="margin-right: 10px;">👤</span> General Details
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="profile-row">
                    <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px 0 0 8px; font-weight: 600; color: #555; width: 25%;">Full Name</td>
                    <td style="padding: 15px; background-color: #f8f9fa; border-radius: 0 8px 8px 0; color: #222;">${info.first_name} ${info.last_name}</td>
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600; color: #555;">Gender</td>
                    <td style="padding: 15px; color: #222;">${info.gender}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 15px; border-radius: 8px 0 0 8px; font-weight: 600; color: #555;">Date of Birth</td>
                    <td style="padding: 15px; border-radius: 0 8px 8px 0; color: #222;">${info.date_of_birth}</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th colspan="2" style="text-align: left; font-size: 20px; color: #003366; padding: 30px 0 10px 0; border-bottom: 2px solid #eef2f6;">
                        <span style="margin-right: 10px;">📧</span> Contact & Professional Socials
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 15px; font-weight: 600; color: #555;">Email Address</td>
                    <td style="padding: 15px;"><a href="mailto:${info.email}" style="color: #00509e; text-decoration: none; font-weight: 500;">${info.email}</a></td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 15px; border-radius: 8px 0 0 8px; font-weight: 600; color: #555;">Phone Number</td>
                    <td style="padding: 15px; border-radius: 0 8px 8px 0; color: #222;">${info.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 15px; font-weight: 600; color: #555;">Profiles</td>
                    <td style="padding: 15px;">
                        <a href="${info.linkedin}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #0077b5; color: white; border-radius: 5px; text-decoration: none; margin-right: 10px; font-size: 14px;">LinkedIn</a>
                        <a href="${info.github}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #333; color: white; border-radius: 5px; text-decoration: none; font-size: 14px;">GitHub</a>
                    </td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th colspan="2" style="text-align: left; font-size: 20px; color: #003366; padding: 30px 0 10px 0; border-bottom: 2px solid #eef2f6;">
                        <span style="margin-right: 10px;">🏠</span> Residential Address
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr style="background-color: #f8f9fa;">
                    <td style="padding: 15px; border-radius: 8px 0 0 8px; font-weight: 600; color: #555;">Address</td>
                    <td style="padding: 15px; border-radius: 0 8px 8px 0; color: #222; line-height: 1.6;">
                        <strong>${info.address.village} - ${info.address.street}</strong><br>
                        ${info.address.city}, ${info.address.state} - ${info.address.pincode}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

    res.status(200).send(html);

}

const grades = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }


        const marksData = user.grades;

        let htmlContent = `<h1 style="color: var(--nav-blue); margin-bottom: 20px;">Academic Performance & Examinations</h1>`;

        marksData.forEach(sem => {
                    htmlContent += `
            <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px; margin-bottom: 40px; border: 1px solid #eef2f6;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--nav-light-blue); padding-bottom: 10px; margin-bottom: 15px;">
                    <h2 style="color: #333; margin: 0;">Semester ${sem.semester} <span style="font-weight: normal; font-size: 0.9rem; color: #666;">(${sem.semester_type})</span></h2>
                    <span style="background: #e7f3ff; color: var(--nav-blue); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">AY: ${sem.academic_year}</span>
                </div>

                <table class="profile-table" style="margin-bottom: 20px;">
                    <thead style="background-color: #fafafa;">
                        <tr>
                            <th style="font-size: 0.9rem; color: #555;">Code</th>
                            <th style="font-size: 0.9rem; color: #555;">Subject Name</th>
                            <th style="font-size: 0.9rem; text-align: center; color: #555;">Internal</th>
                            <th style="font-size: 0.9rem; text-align: center; color: #555;">External</th>
                            <th style="font-size: 0.9rem; text-align: center; color: #555;">Total</th>
                            <th style="font-size: 0.9rem; text-align: center; color: #555;">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sem.subjects.map(sub => `
                            <tr>
                                <td style="font-family: monospace; font-weight: bold; color: var(--nav-blue);">${sub.code}</td>
                                <td>${sub.name}</td>
                                <td style="text-align: center;">${sub.internal}</td>
                                <td style="text-align: center;">${sub.external}</td>
                                <td style="text-align: center; font-weight: bold;">${sub.total}</td>
                                <td style="text-align: center;"><span style="background: #f0fdf4; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: bold; border: 1px solid #bbf7d0;">${sub.grade}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px dashed #cbd5e1;">
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Total Marks</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: #1e293b;">${sem.total_marks} / ${sem.max_marks}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Percentage</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: #1e293b;">${sem.percentage}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">cgpa</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: var(--nav-light-blue);">${sem.cgpa}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Result</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: #15803d;">${sem.result}</div>
                    </div>
                </div>
            </div>
            `;
        });

    const html = htmlContent;

    res.status(200).send(html);


}

const Examinations = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

        const scheduleData = user.exam_schedule;

        let htmlContent = `
            <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Examination Schedule</h1>
            <p style="color: #666; margin-bottom: 25px;">View your upcoming Mid-Term and Semester-End examination dates.</p>
        `;

        scheduleData.forEach(exam => {
            htmlContent += `
            <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 25px; margin-bottom: 35px; border-left: 5px solid #6f42c1;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div>
                        <h2 style="margin: 0; color: #333;">Semester ${exam.semester} - ${exam.exam_type}</h2>
                        <span style="font-size: 0.85rem; color: #888;">Academic Year: ${exam.academic_year}</span>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: #f3e8ff; color: #6f42c1; padding: 6px 15px; border-radius: 5px; font-weight: bold; font-size: 0.8rem;">
                            <i class="fas fa-calendar-alt"></i> SCHEDULED
                        </span>
                    </div>
                </div>

                <table class="profile-table">
                    <thead>
                        <tr style="background-color: #fafafa;">
                            <th style="width: 120px;">Date</th>
                            <th>Subject Details</th>
                            <th>Time Slot</th>
                            <th style="text-align: center;">Examination Hall</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${exam.subjects.map(sub => {
                            // Formatting date to look like a calendar badge
                            const dateObj = new Date(sub.date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            
                            return `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; text-align: center; min-width: 50px; overflow: hidden;">
                                            <div style="background: #6f42c1; color: white; font-size: 0.65rem; padding: 2px; font-weight: bold;">${month.toUpperCase()}</div>
                                            <div style="font-size: 1.1rem; font-weight: bold; padding: 3px; color: #333;">${day}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: bold; color: var(--nav-blue);">${sub.code}</div>
                                    <div style="font-size: 0.9rem; color: #555;">${sub.name}</div>
                                </td>
                                <td>
                                    <div style="font-size: 0.9rem; color: #333;">
                                        <i class="far fa-clock" style="color: #666; margin-right: 5px;"></i> ${sub.time}
                                    </div>
                                </td>
                                <td style="text-align: center;">
                                    <span style="display: inline-block; padding: 4px 12px; background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; border-radius: 4px; font-weight: 600; font-size: 0.85rem;">
                                        <i class="fas fa-map-marker-alt"></i> ${sub.hall}
                                    </span>
                                </td>
                            </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>

                <div style="margin-top: 15px; padding: 10px; background: #fffcf0; border-radius: 6px; border: 1px solid #fffae6; font-size: 0.8rem; color: #856404;">
                    <strong>Note:</strong> Please carry your physical ID Card and Hall Ticket. Reach the examination hall 15 minutes before the start time.
                </div>
            </div>
            `;
        });

        const html = htmlContent;

        res.status(200).send(html);
}


const hostel = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

        const hostelData = user.hostel;

        const html = `
        <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Hostel & Accommodation</h1>
        <p style="color: #666; margin-bottom: 25px;">Details regarding your current residential stay and mess plan.</p>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
            
            <div>
                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 25px; border-top: 5px solid #f59e0b;">
                    <h2 style="color: #333; margin-top: 0; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-bed" style="color: #f59e0b;"></i> Room Information
                    </h2>
                    
                    <table class="profile-table">
                        <tr>
                            <td class="label">Hostel Name</td>
                            <td style="font-weight: bold;">${hostelData.hostel_name}</td>
                        </tr>
                        <tr>
                            <td class="label">Block / Floor</td>
                            <td>Block ${hostelData.block} | Floor ${hostelData.floor}</td>
                        </tr>
                        <tr>
                            <td class="label">Room Number</td>
                            <td><span style="background: #fffbeb; color: #b45309; padding: 4px 12px; border-radius: 6px; font-weight: bold; border: 1px solid #fef3c7;">${hostelData.room_number}</span></td>
                        </tr>
                        <tr>
                            <td class="label">Room Type</td>
                            <td>${hostelData.room_type}</td>
                        </tr>
                        <tr>
                            <td class="label">Check-in Date</td>
                            <td>${hostelData.check_in_date}</td>
                        </tr>
                    </table>

                    <h3 style="margin: 30px 0 15px 0; color: #444; font-size: 1.1rem; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                        <i class="fas fa-users" style="margin-right: 8px;"></i> Roommates
                    </h3>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        ${hostelData.roommates.map(mate => `
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 8px; flex-grow: 1;">
                                <div style="font-weight: bold; color: #334155;">${mate.name}</div>
                                <div style="font-size: 0.8rem; color: #64748b;">Roll No: ${mate.roll_no}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 25px;">
                
                <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px; border: 1px solid #e2e8f0;">
                    <h3 style="margin-top: 0; font-size: 1rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Hostel Warden</h3>
                    <div style="display: flex; align-items: center; gap: 12px; margin-top: 10px;">
                        <div style="width: 45px; height: 45px; background: #e0e7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4338ca; font-weight: bold;">
                            ${hostelData.warden.name.charAt(0)}
                        </div>
                        <div>
                            <div style="font-weight: bold; color: #1e293b;">${hostelData.warden.name}</div>
                            <div style="font-size: 0.85rem; color: #64748b;"><i class="fas fa-phone"></i> ${hostelData.warden.phone}</div>
                        </div>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 20px; color: white;">
                    <h3 style="margin-top: 0; font-size: 1rem; opacity: 0.8;">Payment Summary</h3>
                    <div style="margin: 15px 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Mess Plan</span>
                            <span style="font-weight: bold; color: #fbbf24;">${hostelData.mess_plan}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; opacity: 0.9;">
                            <span>Hostel Fee</span>
                            <span>₹${hostelData.fees.hostel_fee.toLocaleString()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; opacity: 0.9; margin-top: 5px;">
                            <span>Mess Fee</span>
                            <span>₹${hostelData.fees.mess_fee.toLocaleString()}</span>
                        </div>
                    </div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 1.1rem; font-weight: bold;">Total: ₹${(hostelData.fees.hostel_fee + hostelData.fees.mess_fee).toLocaleString()}</span>
                        <span style="background: #22c55e; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${hostelData.fees.status.toUpperCase()}</span>
                    </div>
                </div>

            </div>
        </div>
    `;

    res.status(200).send(html);

}

const student_life = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

        const studentLifeData = user.student_life;

        const html = `
            <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Student Life & Extracurriculars</h1>
            <p style="color: #666; margin-bottom: 25px;">Showcasing club memberships, achievements, sports, and personal interests.</p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px;">
                
                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px; border-top: 5px solid #10b981;">
                    <h3 style="color: #333; margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 1.1rem;">
                        <i class="fas fa-users" style="color: #10b981;"></i> Clubs & Roles
                    </h3>
                    <div style="margin-top: 15px;">
                        ${studentLifeData.clubs.map(club => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f0fdf4; border-radius: 8px; margin-bottom: 10px; border: 1px solid #d1fae5;">
                                <div>
                                    <div style="font-weight: bold; color: #065f46;">${club.name}</div>
                                    <div style="font-size: 0.8rem; color: #059669;">Joined: ${club.joined_year}</div>
                                </div>
                                <span style="background: #059669; color: white; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold;">${club.role.toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px; border-top: 5px solid #ef4444;">
                    <h3 style="color: #333; margin-top: 0; display: flex; align-items: center; gap: 10px; font-size: 1.1rem;">
                        <i class="fas fa-trophy" style="color: #ef4444;"></i> Achievements
                    </h3>
                    <ul style="margin-top: 15px; padding-left: 20px; color: #444; line-height: 1.8;">
                        ${studentLifeData.achievements.map(award => `
                            <li style="margin-bottom: 8px;"><strong>${award}</strong></li>
                        `).join('')}
                    </ul>
                </div>

                <div style="grid-column: span 2; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px;">
                    <h3 style="color: #333; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        <i class="fas fa-calendar-check" style="color: var(--nav-light-blue); margin-right: 10px;"></i> Events & Participation
                    </h3>
                    <table class="profile-table">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th>Date</th>
                                <th>Event Name</th>
                                <th>Type</th>
                                <th>Achievement / Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentLifeData.events_participated.map(event => `
                                <tr>
                                    <td style="font-size: 0.9rem; color: #64748b;">${event.date}</td>
                                    <td style="font-weight: bold; color: #1e293b;">${event.event_name}</td>
                                    <td><span style="font-size: 0.8rem; color: #475569;">${event.type}</span></td>
                                    <td>${event.achievement ? `<span style="color: #b91c1c; font-weight: bold;"><i class="fas fa-medal"></i> ${event.achievement}</span>` : '<span style="color: #94a3b8;">Participant</span>'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px dashed #cbd5e1;">
                    <h4 style="margin-top: 0; color: #475569; font-size: 0.9rem; text-transform: uppercase;">Sports</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        ${studentLifeData.sports.map(sport => `
                            <div style="background: white; padding: 8px 15px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.85rem;">
                                <strong>${sport.name}</strong> <span style="color: #64748b;">(${sport.level})</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px dashed #cbd5e1;">
                    <h4 style="margin-top: 0; color: #475569; font-size: 0.9rem; text-transform: uppercase;">Hobbies</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        ${studentLifeData.hobbies.map(hobby => `
                            <span style="background: #fff; padding: 5px 12px; border-radius: 20px; border: 1px solid #e2e8f0; font-size: 0.85rem; color: #334155;">
                                # ${hobby}
                            </span>
                        `).join('')}
                    </div>
                </div>

            </div>
        `;

        res.status(200).send(html);
}

const  Academics = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

    

        const acadData = user.academic_info;

        const html = `
            <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Academic Overview</h1>
            <p style="color: #666; margin-bottom: 25px;">Comprehensive record of current enrollment, performance metrics, and educational history.</p>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
                <div style="background: linear-gradient(135deg, #004a99 0%, #007bff 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 10px rgba(0,74,153,0.2);">
                    <div style="font-size: 0.8rem; opacity: 0.9; text-transform: uppercase;">Current CGPA</div>
                    <div style="font-size: 1.8rem; font-weight: bold; margin-top: 5px;">${acadData.cgpa_details.overall_cgpa}</div>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Attendance</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #2ecc71; margin-top: 5px;">${acadData.attendance.overall_percentage}%</div>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Active Backlogs</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: ${acadData.backlogs.active > 0 ? '#e74c3c' : '#27ae60'}; margin-top: 5px;">${acadData.backlogs.active}</div>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Current Semester</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #333; margin-top: 5px;">${acadData.current_course.semester}</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                
                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 20px; border: 1px solid #eef2f6;">
                    <h3 style="margin-top: 0; color: #333; border-bottom: 2px solid #eef2f6; padding-bottom: 10px; margin-bottom: 15px;">
                        <i class="fas fa-university" style="color: var(--nav-blue);"></i> Current Course
                    </h3>
                    <table class="profile-table">
                        <tr><td class="label">Degree</td><td>${acadData.current_course.degree}</td></tr>
                        <tr><td class="label">Branch</td><td>${acadData.current_course.branch}</td></tr>
                        <tr><td class="label">Roll Number</td><td style="font-weight: bold;">${acadData.current_course.roll_number}</td></tr>
                        <tr><td class="label">Section / Year</td><td>${acadData.current_course.section} / ${acadData.current_course.year} Year</td></tr>
                    </table>
                </div>

                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 20px; border: 1px solid #eef2f6;">
                    <h3 style="margin-top: 0; color: #333; border-bottom: 2px solid #eef2f6; padding-bottom: 10px; margin-bottom: 15px;">
                        <i class="fas fa-history" style="color: #6366f1;"></i> Education History
                    </h3>
                    ${acadData.education_history.map(edu => `
                        <div style="padding: 10px; border-radius: 8px; background: #f8fafc; margin-bottom: 10px; border-left: 4px solid #cbd5e1;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; color: #1e293b;">${edu.level} - ${edu.board}</span>
                                <span style="color: #059669; font-weight: bold;">${edu.percentage}%</span>
                            </div>
                            <div style="font-size: 0.85rem; color: #64748b; margin-top: 3px;">${edu.school_name || edu.college_name} | ${edu.year_of_passing}</div>
                        </div>
                    `).join('')}
                </div>

                <div style="grid-column: span 2; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 25px;">
                    <div style="display: flex; gap: 30px;">
                        <div style="flex: 1;">
                            <h3 style="color: #333; margin-bottom: 15px;"><i class="fas fa-project-diagram" style="color: #f59e0b;"></i> Projects</h3>
                            ${acadData.projects.map(proj => `
                                <div style="margin-bottom: 15px;">
                                    <div style="font-weight: bold;">${proj.title} <span style="font-size: 0.7rem; background: #eee; padding: 2px 6px; border-radius: 4px;">${proj.type}</span></div>
                                    <div style="font-size: 0.85rem; color: #666;">Tech: ${proj.technologies.join(', ')}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="flex: 1; border-left: 1px solid #eee; padding-left: 30px;">
                            <h3 style="color: #333; margin-bottom: 15px;"><i class="fas fa-briefcase" style="color: #3b82f6;"></i> Internships</h3>
                            ${acadData.internships.map(intern => `
                                <div>
                                    <div style="font-weight: bold;">${intern.company}</div>
                                    <div style="font-size: 0.85rem; color: #444;">${intern.role}</div>
                                    <div style="font-size: 0.8rem; color: #888;">Duration: ${intern.duration} (${intern.year})</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        res.status(200).send(html);


}


const  finance = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

        const finData = user.finance;

        const html = `
            <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Financial Statement</h1>
            <p style="color: #666; margin-bottom: 25px;">Track your fee structure, scholarship credits, and payment transaction history.</p>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px; margin-bottom: 30px;">
                
                <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 25px; border: 1px solid #e2e8f0;">
                    <h3 style="margin-top: 0; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-file-invoice-dollar" style="color: #059669;"></i> Annual Fee Structure
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                            <div style="font-size: 0.8rem; color: #64748b;">Tuition Fee</div>
                            <div style="font-size: 1.1rem; font-weight: bold;">₹${finData.fee_structure.tuition_fee.toLocaleString()}</div>
                        </div>
                        <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                            <div style="font-size: 0.8rem; color: #64748b;">Hostel & Mess</div>
                            <div style="font-size: 1.1rem; font-weight: bold;">₹${(finData.fee_structure.hostel_fee + finData.fee_structure.mess_fee).toLocaleString()}</div>
                        </div>
                        <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                            <div style="font-size: 0.8rem; color: #64748b;">Other Charges</div>
                            <div style="font-size: 1.1rem; font-weight: bold;">₹${finData.fee_structure.other_charges.toLocaleString()}</div>
                        </div>
                        <div style="padding: 15px; background: #0f172a; border-radius: 8px; color: white;">
                            <div style="font-size: 0.8rem; opacity: 0.8;">Total Net Fee</div>
                            <div style="font-size: 1.1rem; font-weight: bold;">₹${finData.fee_structure.total_fee.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="background: ${finData.dues.pending_amount === 0 ? '#ecfdf5' : '#fff1f2'}; border: 1px solid ${finData.dues.pending_amount === 0 ? '#10b981' : '#f43f5e'}; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 0.85rem; color: #374151; font-weight: 600;">PENDING DUES</div>
                        <div style="font-size: 2rem; font-weight: 800; color: ${finData.dues.pending_amount === 0 ? '#059669' : '#e11d48'}; margin: 10px 0;">
                            ₹${finData.dues.pending_amount.toLocaleString()}
                        </div>
                        <div style="font-size: 0.75rem; color: #6b7280;">Status: <strong>${finData.dues.status.toUpperCase()}</strong></div>
                    </div>

                    <div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 15px; border-radius: 12px;">
                        <h4 style="margin: 0; font-size: 0.8rem; color: #1e40af; text-transform: uppercase;">Scholarship Applied</h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                            <span style="font-weight: bold; color: #1d4ed8;">${finData.scholarships[0].name}</span>
                            <span style="color: #1d4ed8;">-₹${finData.scholarships[0].amount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 25px;">
                <h3 style="margin-top: 0; color: #333; margin-bottom: 20px;">
                    <i class="fas fa-history" style="color: #64748b;"></i> Recent Transactions
                </h3>
                <table class="profile-table">
                    <thead style="background: #f8fafc;">
                        <tr>
                            <th>Date</th>
                            <th>Payment ID</th>
                            <th>Mode</th>
                            <th>Transaction ID</th>
                            <th style="text-align: right;">Amount</th>
                            <th style="text-align: center;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${finData.payments.map(pay => `
                            <tr>
                                <td style="font-size: 0.85rem; color: #64748b;">${pay.date}</td>
                                <td style="font-weight: 600;">${pay.payment_id}</td>
                                <td><span style="font-size: 0.8rem; background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${pay.payment_mode}</span></td>
                                <td style="font-family: monospace; font-size: 0.85rem;">${pay.transaction_id}</td>
                                <td style="text-align: right; font-weight: bold; color: #1e293b;">₹${pay.amount.toLocaleString()}</td>
                                <td style="text-align: center;"><span style="color: #059669; font-weight: bold;"><i class="fas fa-check-circle"></i> ${pay.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 25px;">
                <div style="background: #f8fafc; border: 1px dashed #cbd5e1; padding: 20px; border-radius: 12px;">
                    <h4 style="margin-top: 0; color: #475569; font-size: 0.8rem; text-transform: uppercase;">Linked Bank Account</h4>
                    <div style="margin-top: 10px; font-size: 0.9rem;">
                        <div style="font-weight: bold; color: #1e293b;">${finData.bank_details.bank_name} - ${finData.bank_details.account_number}</div>
                        <div style="color: #64748b;">IFSC: ${finData.bank_details.ifsc} | Holder: ${finData.bank_details.account_holder}</div>
                    </div>
                </div>
                <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 20px; border-radius: 12px;">
                    <h4 style="margin-top: 0; color: #be185d; font-size: 0.8rem; text-transform: uppercase;">Refunds / Fines</h4>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.9rem;">
                        <span style="color: #9d174d;"><i class="fas fa-reply"></i> Refund: ${finData.refunds[0].reason}</span>
                        <span style="font-weight: bold; color: #059669;">+₹${finData.refunds[0].amount}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.9rem;">
                        <span style="color: #9d174d;"><i class="fas fa-exclamation-circle"></i> Fine: ${finData.fines[0].reason}</span>
                        <span style="font-weight: bold; color: #e11d48;">-₹${finData.fines[0].amount}</span>
                    </div>
                </div>
            </div>
        `;

        res.status(200).send(html);

} 

const contact = async(req, res) => {


        const { username } = req.user;

        if (!username) {
            return res.status(404).json({ message: "token is expired or authentication failed " })
        }



        const db = contactdetailes();

        const user = await db.collection("students").findOne({ "username": username });

        if (!user) {
            return res.status(401).json({ message: "user not found " + username });
        }

        const contactData = user.contact_us;

        const html = `
            <h1 style="color: var(--nav-blue); margin-bottom: 5px;">Contact Support & University Directory</h1>
            <p style="color: #666; margin-bottom: 25px;">Get in touch with the administration, department offices, or visit the campus.</p>

            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 25px;">
                
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <div style="background: linear-gradient(135deg, #004a99 0%, #007bff 100%); color: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,74,153,0.2);">
                        <h2 style="margin: 0; font-size: 1.4rem;">${contactData.institution_name}</h2>
                        <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.9; line-height: 1.6;">
                            <i class="fas fa-map-marker-alt" style="margin-right: 8px;"></i> ${contactData.address.street},<br>
                            ${contactData.address.area}, ${contactData.address.city},<br>
                            ${contactData.address.state} - ${contactData.address.pincode}
                        </div>
                        <div style="margin-top: 20px; display: flex; gap: 10px;">
                            <a href="${contactData.social_media.website}" target="_blank" style="color: white; background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem;">Visit Website</a>
                        </div>
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
                        <h3 style="margin-top: 0; font-size: 1rem; color: #333; margin-bottom: 15px;"><i class="far fa-clock" style="color: #007bff;"></i> Office Hours</h3>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px; color: #444;">
                            <span>Mon - Fri:</span>
                            <span style="font-weight: 600;">${contactData.working_hours.monday_to_friday}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px; color: #444;">
                            <span>Saturday:</span>
                            <span style="font-weight: 600;">${contactData.working_hours.saturday}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #e11d48;">
                            <span>Sunday:</span>
                            <span style="font-weight: bold;">${contactData.working_hours.sunday}</span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 25px; border: 1px solid #eef2f6;">
                        <h3 style="margin-top: 0; color: #333; margin-bottom: 15px;">Official Directory</h3>
                        <table class="profile-table" style="font-size: 0.9rem;">
                            <thead>
                                <tr style="background: #f8fafc;">
                                    <th>Office Type</th>
                                    <th>Contact Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${contactData.contact_numbers.map((num, i) => `
                                    <tr>
                                        <td style="font-weight: 600; color: #475569;">${num.type}</td>
                                        <td>
                                            <div style="color: #007bff; font-weight: 500;"><i class="fas fa-phone-alt" style="font-size: 0.8rem;"></i> ${num.number}</div>
                                            <div style="color: #64748b; font-size: 0.8rem; margin-top: 4px;"><i class="far fa-envelope"></i> ${contactData.email_addresses[i]?.email || ''}</div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px dashed #cbd5e1;">
                        <h4 style="margin-top: 0; color: #475569; font-size: 0.8rem; text-transform: uppercase;">Department Inquiries</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                            ${contactData.departments.map(dept => `
                                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                    <div style="font-weight: bold; font-size: 0.85rem; color: #1e293b; height: 35px; overflow: hidden;">${dept.name}</div>
                                    <div style="margin-top: 8px; font-size: 0.8rem; color: #007bff;">${dept.phone}</div>
                                    <div style="font-size: 0.75rem; color: #64748b;">${dept.email}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>
            </div>
            
            <div style="margin-top: 30px; display: flex; justify-content: center; gap: 20px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <a href="${contactData.social_media.linkedin}" target="_blank" style="color: #0077b5; font-size: 1.5rem;"><i class="fab fa-linkedin"></i></a>
                <a href="${contactData.social_media.instagram}" target="_blank" style="color: #e4405f; font-size: 1.5rem;"><i class="fab fa-instagram"></i></a>
                <a href="${contactData.social_media.youtube}" target="_blank" style="color: #ff0000; font-size: 1.5rem;"><i class="fab fa-youtube"></i></a>
            </div>
        `;

        res.status(200).send(html);

}

const updatepass = (req , res) =>{

    const { username } = req.user;

    if (!username) {
        return res.status(404).json({ message: "token is expired or authentication failed " })
    }

    const html = `
    <div style="display: flex; justify-content: center;">
        <div style="width: 100%; max-width: 500px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 30px; border-top: 5px solid var(--nav-blue);">
            
            <h3 style="margin-top: 0; color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-key" style="color: var(--nav-light-blue);"></i> Change Password
            </h3>

            <form id="passwordForm" onsubmit="updatepassword(event)" style="display: flex; flex-direction: column; gap: 20px;">
                
                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 8px;">Current Password</label>
                    <input type="password" placeholder="Enter current password" id="current_password" 
                        style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--nav-light-blue)'" 
                        onblur="this.style.borderColor='#cbd5e1'" required>
                </div>

                <hr style="margin: 5px 0; border-top: 1px solid #f1f5f9;">

                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 8px;">New Password</label>
                    <input type="password" id="newpassword" placeholder="Min. 8 characters" 
                        style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; outline: none;"
                        onfocus="this.style.borderColor='var(--nav-light-blue)'" 
                        onblur="this.style.borderColor='#cbd5e1'" required>
                </div>

                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 8px;">Confirm New Password</label>
                    <input type="password" id="samepassword" placeholder="Re-type new password" 
                        style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; outline: none;"
                        onfocus="this.style.borderColor='var(--nav-light-blue)'" 
                        onblur="this.style.borderColor='#cbd5e1'" required>
                </div>

                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <div style="font-size: 0.75rem; color: #64748b; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">Requirements:</div>
                    <ul style="margin: 0; padding-left: 18px; font-size: 0.8rem; color: #475569; line-height: 1.6;">
                        <li>At least 8 characters long</li>
                        <li>Must include a number or symbol</li>
                        <li>Cannot be the same as old password</li>
                    </ul>
                </div>

                <div style="display: flex; gap: 15px; margin-top: 10px;">
                    <button type="submit" style="flex: 2; background: var(--nav-blue); color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s;"
                        onmouseover="this.style.background='#003d80'" 
                        onmouseout="this.style.background='var(--nav-blue)'">
                        Update Password
                    </button>
                    
                </div>

                <h3 id ="resultform" >  </h3>

            </form>
        </div>
    </div>
        `;
    
    res.status(200).send(html);
    


}

const update = async(req,res) => {

    const{ currpass , newpass } = req.body;
    const { username } = req.user; 

    if (!username) {
        return res.status(404).json({ message: "token is expired or authentication failed " });
    }

    const db = getDB();
    const user = await db.collection("users").findOne({ username });
    
    
    if (!user) {
    
        return res.status(404).json({ message: "user does not exists" });
    
    }
    
    const ismatch = await bcrypt.compare(currpass, user.password);
    
    if(!ismatch){

        res.status(401).json({message : "invalid user current password"});
        return;

    }

    const hash = await bcrypt.hash(newpass , 10);

    const response = await db.collection("users").updateOne(
    { username },
    { $set: { password: hash } }
    );

    if (response.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    if (response.modifiedCount === 0) {
        return res.status(400).json({ message: "Password not updated" });
    }

    res.status(200).json({ message: "Password updated successfully" });

}

const logout = async (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.clearCookie('username', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.json({ message: "Logged out" });
};


module.exports = { dashboard, about, grades , Examinations , hostel ,student_life , Academics , finance ,contact ,update  ,updatepass , logout};