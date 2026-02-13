import { createConsumer } from "@rails/actioncable"

const CABLE_URL = 
    process.env.NEXT_PUBLIC_CABLE_URL || "ws:localhost:3000/cable?token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMDE5YzM5MTItMjEzZC03ZDZlLWI3NDEtMTIwYWJlM2EyYzRmIiwic2Vzc2lvbl9pZCI6IjAxOWM1N2NmLTgwNzktNzFmNy1iOWY2LTgwOGYxYWY4OGI4NiIsImV4cCI6MTc3MTAwMDY0Mn0.Gxi-5RbuT4V_eoPPbGnPAnaLUHli302omi-TmLxkQag"

export const cable = createConsumer(CABLE_URL)