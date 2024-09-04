export interface Player {
    id: number;
    name: string;
}

export interface Stats {
    id: number;
    raid_count: number;
    pmc_kills: number;
    avg_time: string;
    avg_xp: number;
    avg_healed: number;
    avg_dist: number;
    avg_acc: number;
    avg_scav: number;
}