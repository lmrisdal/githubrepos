import { Repository } from './repository.interface';

export interface ApiResult {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}
