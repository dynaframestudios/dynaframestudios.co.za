// assets/js/pc-builder/data/recommended-builds.js

export const RecommendedBuilds = [

    // =====================================================
    // OFFICE ESSENTIAL
    // =====================================================

    {
        id: "office-essential",

        name: "Office Essential",

        category: "Business",

        description:
            "Reliable everyday office computer designed for Microsoft Office, web browsing, accounting software, emails and remote work.",

        idealFor: [
            "Small Businesses",
            "Schools",
            "Reception",
            "Admin Offices"
        ],

        cpu: {
            amd: "r5-5600g",
            intel: "i3-12100f"
        },

        motherboard: {
            amd: "asus-prime-a520m-a-ii-csm",
            intel: "asus-tuf-b660m-plus-d4"
        },

        ram: "16gb-ddr4",

        storage: [
            "500gb-nvme"
        ],

        gpu: "integrated",

        psu: "450w-bronze",

        case: "mini-black",

        cooling: "stock-cooler",

        estimatedPower: 180,

        price: 0,

        featured: true
    },

    // =====================================================
    // PROFESSIONAL WORKSTATION
    // =====================================================

    {
        id: "professional-workstation",

        name: "Professional Workstation",

        category: "Workstation",

        description:
            "Built for developers, engineers, creators, virtual machines, rendering, CAD and heavy multitasking.",

        idealFor: [
            "Software Development",
            "Video Editing",
            "CAD",
            "Virtual Machines",
            "Database Servers"
        ],

        cpu: {
            amd: "r7-7700x",
            intel: "i7-13700k"
        },

        motherboard: {
            amd: "gigabyte-b650-eagle-ax",
            intel: "asus-rog-maximus-z790-hero"
        },

        ram: "32gb-ddr5",

        storage: [
            "1tb-nvme",
            "2tb-ssd"
        ],

        gpu: "rtx4070",

        psu: "850w-gold",

        case: "mid-black",

        cooling: "aio-240",

        estimatedPower: 550,

        price: 0,

        featured: true
    },

    // =====================================================
    // ULTIMATE GAMING RIG
    // =====================================================

    {
        id: "ultimate-gaming",

        name: "Ultimate Gaming Rig",

        category: "Gaming",

        description:
            "High-end gaming PC capable of 1440p Ultra and 4K gaming with excellent streaming performance.",

        idealFor: [
            "AAA Gaming",
            "Streaming",
            "Content Creation",
            "Esports"
        ],

        cpu: {
            amd: "r7-7800x3d",
            intel: "i9-13900k"
        },

        motherboard: {
            amd: "msi-mag-x870-tomahawk",
            intel: "msi-meg-z790-godlike"
        },

        ram: "32gb-ddr5",

        storage: [
            "2tb-nvme"
        ],

        gpu: "rtx4080",

        psu: "1000w-gold",

        case: "full-black-rgb",

        cooling: "aio-360",

        estimatedPower: 780,

        rgb: true,

        price: 0,

        featured: true
    }

];
