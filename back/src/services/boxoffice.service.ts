import { Injectable, OnModuleInit } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs/promises';
import { MovieJson } from "src/interfaces/movie.interface";

@Injectable()
export class BoxofficeService implements OnModuleInit {
  private readonly filePath = path.join(__dirname, '..', '..', 'storage', 'movies.json');
  private data: Record<string, MovieJson> = {};

  async onModuleInit() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      const rawData = JSON.parse(content);

      if (this.verifyValidityJson(rawData)) {
        this.data = rawData as Record<string, MovieJson>;
      } else {
        console.warn('Le fichier movies.json contient un format invalide. Il ne sera pas chargé.');
        this.data = {};
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('Fichier movies.json non trouvé. Création d’un nouveau fichier.');
        this.data = {};
        await this.saveData();
      } else {
        console.error('Erreur lors de la lecture du fichier movies.json:', err.message);
        throw err;
      }
    }
  }

  getAll() {
    return this.data;
  }

  getHidden(): Record<string, MovieJson> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([_, value]) => value.hidden === true)
    );
  }

  get(id: string): MovieJson | null {
    return this.data[id] ?? null;
  }

  getOrInit(id: string): MovieJson {
    if (!this.data[id]) {
      const entry: MovieJson = {
        boxoffice: null,
        position: null,
        hidden: false,
        trailer: null,
        tiktok: null
      };
      this.set(id, entry);
      return entry;
    }
    return this.data[id];
  }

  async set(id: string, value: MovieJson) {
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

  private verifyValidityJson(rawData: any): boolean {
    return Object.values(rawData).every(value =>
      typeof value === 'object' &&
      value !== null &&
      'boxoffice' in value &&
      'position' in value &&
      'hidden' in value
    );
  }
}