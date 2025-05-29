import { Injectable, OnModuleInit } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs/promises';

@Injectable()
export class BoxOfficeService implements OnModuleInit {
  private readonly filePath = path.join(__dirname, '..', '..', 'storage', 'boxoffice.json');
  private data: Record<string, string> = {};

  async onModuleInit() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(content);
    } catch {
      this.data = {};
      await this.saveData();
    }
  }

  getAll() {
    return this.data;
  }

  get(id: string): string | null {
    return this.data[id] ?? null;
  }

  getOrInit(id: string): string {
    const value = this.get(id);
    if (!value) {
      const ret = '-';
      this.set(id, ret);
      return ret;
    }
    return value;
  }

  async set(id: string, value: string) {
    this.data[id] = value;
    await this.saveData();
  }

  async delete(id: string) {
    delete this.data[id];
    await this.saveData();
  }

  async clear(ids: string[]) {
    for (const key in this.data) {
    if (!ids.includes(key)) {
      delete this.data[key];
      await this.saveData();
    }
  }
  }

  private async saveData() {
    await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
  }
}