<?php

namespace Database\Seeders;

use App\Models\Codetable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CodetableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('codetables')->insert([
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'Testing',
            'description1' => 'Testing',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'IH',
            'description1' => 'IH WEM',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'Consulting',
            'description1' => 'Consulting',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'OSHMS',
            'description1' => 'OSHMS',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'HR',
            'description1' => 'HR',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'Sales',
            'description1' => 'Sales',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'Marketing',
            'description1' => 'Marketing',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'FAD',
            'description1' => 'FAD',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'IT',
            'description1' => 'IT',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'IMS',
            'description1' => 'IMS',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'ESH',
            'description1' => 'ESH',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'Top Management',
            'description1' => 'Top Management',
            ],
            [
            'codename' => 'DEPARTMENT',
            'codevalue' => 'IH',
            'description1' => 'IH Lab',
            ],
            [
            'codename' => 'CLASSIFICATION',
            'codevalue' => 'Process',
            'description1' => 'Process',
            ],
            [
            'codename' => 'CLASSIFICATION',
            'codevalue' => 'Performance Evaluation',
            'description1' => 'Performance Evaluation',
            ],
            [
            'codename' => 'CLASSIFICATION',
            'codevalue' => 'Documented Information',
            'description1' => 'Documented Information',
            ],
            [
            'codename' => 'CLASSIFICATION',
            'codevalue' => 'Legal Compliance',
            'description1' => 'Legal Compliance',
            ],
            [
            'codename' => 'CLASSIFICATION',
            'codevalue' => 'Costumer Satisfaction',
            'description1' => 'Costumer Satisfaction',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'IA',
            'description1' => 'Internal Audits',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'VOC',
            'description1' => 'Customer Complaints/Voice of Customer',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'Obj',
            'description1' => 'Unmet Targets/Objectives',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'MR',
            'description1' => 'Management Reviews',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'NO',
            'description1' => 'Nonconforming outputs (including from suppliers)',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'IPC',
            'description1' => 'In-process concerns',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'Inci',
            'description1' => 'Accidents/Incidents',
            ],
            [
            'codename' => 'RFA_CLASSIFICATION',
            'codevalue' => 'Envi inci',
            'description1' => 'Environmental Incidents',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 4',
            'description1' => 'Clause 4 (Context)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 5',
            'description1' => 'Clause 5 (Leadership)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 6',
            'description1' => 'Clause 6 (Planning)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 7',
            'description1' => 'Clause 7 (Support)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 8',
            'description1' => 'Clause 8 (Operation)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 9',
            'description1' => 'Clause 9 (Performance Evaluation)',
            ],
            [
            'codename' => 'CLAUSE',
            'codevalue' => 'Clause 10',
            'description1' => 'Clause 10 (Improvement)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.1 (Understanding the organization and its context)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.2 (Understanding the needs and expectations of interested parties)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.3 (Determining the scope of the quality management system)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.4 (Quality management system and its processes)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.1 (Leadership and commitment)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.2 (Quality policy)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.3 (Organizational roles, responsibilities, and authorities)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.1 (Actions to address risks and opportunities)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.2 (Quality objectives and planning to achieve them)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.1 (Resources)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.2 (Competence)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.3 (Awareness)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.4 (Communication)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.5 (Documented information)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.1 (Operational planning and control)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.2 (Requirements for products and services)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.3 (Design and development of products and services)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.4 (Control of externally provided processes, products, and services)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.5 (Production and service provision)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.6 (Release of products and services)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.7 (Control of nonconforming outputs)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.1 (Monitoring, measurement, analysis, and evaluation)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.2 (Internal audit)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.3 (Management review)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.1 (General)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.2 (Nonconformity and corrective action)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 9001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.3 (Continual improvement)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.1 (Understanding the organization and its context)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.2 (Understanding the needs and expectations of interested parties)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.3 (Determining the scope of the environmental management system)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.4 (Environmental management system)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.1 (Leadership and commitment)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.2 (Environmental policy)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.1 (Actions to address risks and opportunities)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.2 (Environmental objectives and planning to achieve them)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.1 (Resources)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.2 (Competence)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.3 (Awareness)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.4 (Communication)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.5 (Documented information)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.1 (Operational planning and control)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.2 (Emergency preparedness and response)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.1 (Monitoring, measurement, analysis, and evaluation)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.2 (Internal audit)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.3 (Management review)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.1 (General)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.2 (Nonconformity and corrective action)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 14001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.3 (Continual improvement)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.1 (Understanding the organization and its context)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.2 (Understanding the needs and expectations of workers and other interested parties)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.3 (Determining the scope of the occupational health and safety management system)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 4',
            'description1' => 'Sub Clause 4.4 (Occupational health and safety management system)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.1 (Leadership and commitment)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.2 (Policy)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 5',
            'description1' => 'Sub Clause 5.3 (Organizational roles, responsibilities, and authorities)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.1 (Actions to address risks and opportunities)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 6',
            'description1' => 'Sub Clause 6.2 (Occupational health and safety objectives and planning to achieve them)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.1 (Resources)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.2 (Competence)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.3 (Awareness)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.4 (Communication)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 7',
            'description1' => 'Sub Clause 7.5 (Documented information)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.1 (Operational planning and control)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.2 (Management of change)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.3 (Outsourcing)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 8',
            'description1' => 'Sub Clause 8.4 (Procurement)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.1 (Monitoring, measurement, analysis, and performance evaluation)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.2 (Internal audit)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 9',
            'description1' => 'Sub Clause 9.3 (Management review)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.1 (Incident, nonconformity, and corrective action)',
            ],
            [
            'codename' => 'SUB CLAUSE ISO 45001',
            'codevalue' => 'Sub Clause 10',
            'description1' => 'Sub Clause 10.2 (Continual improvement)',
            ],
        ]);
    }
}
