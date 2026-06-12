import { State } from "@prisma/client";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { applicationSchema, updateApplicationSchema } from "../validators/application.js";

export async function createApplication(req: Request, res: Response) {
  const input = applicationSchema.parse(req.body);
  const application = await prisma.companyApplication.create({
    data: {
      userId: req.user!.id,
      companyName: input.companyName,
      selectedState: input.selectedState,
      entityType: input.entityType,
      notes: input.notes,
      industry: input.industry,
      businessPurpose: input.businessPurpose
    }
  });
  return res.status(201).json({ application });
}

export async function listMyApplications(req: Request, res: Response) {
  const applications = await prisma.companyApplication.findMany({
    where: { userId: req.user!.id },
    orderBy: { submissionDate: "desc" },
    include: { payments: true }
  });
  return res.json({ applications });
}

export async function listAllApplications(req: Request, res: Response) {
  const state = req.query.state ? String(req.query.state) : undefined;
  const applications = await prisma.companyApplication.findMany({
    where: state && Object.values(State).includes(state as State) ? { selectedState: state as State } : undefined,
    include: { user: { select: { id: true, fullName: true, email: true } }, payments: true },
    orderBy: { submissionDate: "desc" }
  });
  return res.json({ applications });
}

export async function updateApplication(req: Request, res: Response) {
  const input = updateApplicationSchema.parse(req.body);
  const application = await prisma.companyApplication.update({
    where: { id: String(req.params.id) },
    data: input
  });
  return res.json({ application });
}
