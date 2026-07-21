// assets/js/pc-builder/data/intel-motherboards.js

export const IntelMotherboards = [

    // =====================================================
    // Z790
    // =====================================================

    {
        id:"asus-rog-maximus-z790-hero",
        brand:"ASUS",
        model:"ROG Maximus Z790 Hero",
        chipset:"Z790",
        socket:"LGA1700",
        ramType:"DDR5",
        ramSlots:4,
        m2Slots:5,
        sataPorts:6,
        formFactor:"ATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:true,
        biosUpdate:false,
        price:0
    },

    {
        id:"msi-meg-z790-godlike",
        brand:"MSI",
        model:"MEG Z790 GODLIKE",
        chipset:"Z790",
        socket:"LGA1700",
        ramType:"DDR5",
        ramSlots:4,
        m2Slots:7,
        sataPorts:6,
        formFactor:"E-ATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:true,
        biosUpdate:false,
        price:0
    },

    // =====================================================
    // Z690
    // =====================================================

    {
        id:"asus-z690-a-gaming-wifi",
        brand:"ASUS",
        model:"ROG Strix Z690-A Gaming WiFi",
        chipset:"Z690",
        socket:"LGA1700",
        ramType:"DDR5",
        ramSlots:4,
        m2Slots:4,
        sataPorts:6,
        formFactor:"ATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:true,
        biosUpdate:true,
        price:0
    },

    {
        id:"msi-pro-z690-a-ddr4",
        brand:"MSI",
        model:"PRO Z690-A WIFI DDR4",
        chipset:"Z690",
        socket:"LGA1700",
        ramType:"DDR4",
        ramSlots:4,
        m2Slots:4,
        sataPorts:6,
        formFactor:"ATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:true,
        biosUpdate:true,
        price:0
    },

    // =====================================================
    // B760
    // =====================================================

    {
        id:"asus-tuf-b760m-plus",
        brand:"ASUS",
        model:"TUF Gaming B760M-Plus WiFi",
        chipset:"B760",
        socket:"LGA1700",
        ramType:"DDR5",
        ramSlots:4,
        m2Slots:2,
        sataPorts:4,
        formFactor:"mATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:false,
        biosUpdate:false,
        price:0
    },

    {
        id:"msi-mag-b660m-mortar-ddr5",
        brand:"MSI",
        model:"MAG B660M Mortar WiFi",
        chipset:"B660",
        socket:"LGA1700",
        ramType:"DDR5",
        ramSlots:4,
        m2Slots:2,
        sataPorts:6,
        formFactor:"mATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:false,
        biosUpdate:true,
        price:0
    },

    // =====================================================
    // DDR4 OPTIONS
    // =====================================================

    {
        id:"asus-tuf-b660m-plus-d4",
        brand:"ASUS",
        model:"TUF Gaming B660M-Plus WiFi D4",
        chipset:"B660",
        socket:"LGA1700",
        ramType:"DDR4",
        ramSlots:4,
        m2Slots:2,
        sataPorts:4,
        formFactor:"mATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:false,
        biosUpdate:true,
        price:0
    },

    {
        id:"msi-mag-b660m-mortar-ddr4",
        brand:"MSI",
        model:"MAG B660M Mortar WiFi DDR4",
        chipset:"B660",
        socket:"LGA1700",
        ramType:"DDR4",
        ramSlots:4,
        m2Slots:2,
        sataPorts:6,
        formFactor:"mATX",
        wifi:true,
        bluetooth:true,
        supportedGenerations:[
            "12th Gen (Alder Lake)",
            "13th Gen (Raptor Lake)"
        ],
        overclocking:false,
        biosUpdate:true,
        price:0
    }

];