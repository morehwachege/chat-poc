import { createConsumer } from "@rails/actioncable"

const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMDE5YzM5MTItMjEzZC03ZDZlLWI3NDEtMTIwYWJlM2EyYzRmIiwic2Vzc2lvbl9pZCI6IjAxOWM1N2RhLTA3OTktNzFhMS04ZmM4LWY4MjU0MTRiYmI1ZCIsImV4cCI6MTc3MTAwMTMzMn0.eOOLtBEDv4pb_A-2Smz6Et16GKluB-PCn2w4Yiz5nfg"

const CABLE_URL = 
    process.env.NEXT_PUBLIC_CABLE_URL || `ws:localhost:3000/cable?token=${token}`

export const cable = createConsumer(CABLE_URL)