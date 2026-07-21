/**
 * ==========================================
 * DynaFrame Builder
 * Version 1.0.0 "Genesis"
 * ==========================================
 */

import { SERVICE_FEE } from "./constants.js";

export const buildState = {

    purpose:null,

    cpu:null,

    motherboard:null,

    ram:[],

    storage:[],

    gpu:null,

    psu:null,

    pcCase:null,

    cooling:[],

    extras:[],

    serviceFee:SERVICE_FEE

};

const builderLayout=document.querySelector(".builder-layout");

const launchButton=document.getElementById("startBuilderBtn");

const stage=document.getElementById("builder-stage");

const progress=document.getElementById("builder-progress");

const summary=document.getElementById("summary-content");

builderLayout.classList.add("builder-hidden");

launchButton.addEventListener("click",()=>{

    builderLayout.classList.remove("builder-hidden");

    builderLayout.classList.add("fade-up");

    builderLayout.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

    renderPurposeStep();

    renderSummary();

});

function renderPurposeStep(){

    progress.innerHTML=`

        <h4>Step 1 of 10</h4>

        <progress value="1" max="10"></progress>

    `;

    stage.innerHTML=`

        <div class="purpose-step">

            <h2>What are you building today?</h2>

            <p>Select the option that best describes your needs.</p>

            <div class="purpose-grid">

                <button class="purpose-card">

                    <i class="fas fa-building"></i>

                    <span>Business Workstations</span>

                </button>

                <button class="purpose-card">

                    <i class="fas fa-user"></i>

                    <span>Personal Computer</span>

                </button>

                <button class="purpose-card">

                    <i class="fas fa-gamepad"></i>

                    <span>Gaming Rig</span>

                </button>

            </div>

        </div>

    `;

}

function renderSummary(){

    summary.innerHTML=`

        <div class="summary-item">

            <span>Assembly Fee</span>

            <strong>R${SERVICE_FEE}</strong>

        </div>

        <hr>

        <p>No components selected.</p>

    `;

}

console.log("✅ DynaFrame Builder Initialized");